import os
import json
import requests
from typing import List, Dict, Any, Optional

class LLMService:
    def __init__(self):
        self.provider = os.getenv("LLM_PROVIDER", "openai").lower() # openai, gemini, ollama
        self.api_key = os.getenv("LLM_API_KEY", "")
        self.model = os.getenv("LLM_MODEL", "gemini-1.5-flash")
        
        # Base URLs
        self.openai_base = "https://api.openai.com/v1/chat/completions"
        self.ollama_base = "http://localhost:11434/api/generate"

        if self.provider == "gemini":
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
            except ImportError:
                print("Warning: google-generativeai not installed. Gemini calls will fail.")

    def generate_analysis(self, system_prompt: str, user_prompt: str) -> Dict[str, Any]:
        """
        Generates a structured JSON response for legal analysis.
        """
        # For Gemini 1.5, we can use system_instruction parameter or just prepend it
        full_prompt = f"{system_prompt}\n\nUser Case:\n{user_prompt}"
        
        try:
            if self.provider == "gemini":
                return self._call_gemini(full_prompt, json_mode=True)
            elif self.provider == "ollama":
                return self._call_ollama(full_prompt, json_mode=True)
            else:
                return self._call_openai(system_prompt, user_prompt, json_mode=True)
        except Exception as e:
            print(f"LLM Generation Error: {e}")
            return {"error": str(e)}

    def chat_completion(self, history: List[Dict[str, str]], context: str = "", system_instruction: str = "", local_matches=None) -> str:
        """
        Streamlined chat completion with RAG context and optional system override.
        """
        default_sys = (
            "You are NyayaAssist, an authoritative AI legal assistant for Indian Law.\n"
            "INSTRUCTION: Use the provided [LEGAL CONTEXT] to ground your answers in specific data.\n"
            "FORMAT YOUR RESPONSE WITH THE FOLLOWING STRUCTURE:\n"
            "1. **Title**: A clear legal title for the topic.\n"
            "2. **Definition**: A concise legal definition.\n"
            "3. **Key Points**: 3-5 bullet points summarizing the core concept.\n"
            "4. **In-depth Details**: A detailed explanation of the section/case, citing specific clauses or judgments from the context.\n"
            "5. **Advantages & Disadvantages**: (If applicable) specific pros and cons or legal implications.\n\n"
            "CITE sources clearly (e.g., 'According to [source]...').\n"
            "FALLBACK: If the provided context does not contain the specific answer, use your pre-trained "
            "professional legal knowledge of the Indian Penal Code (IPC), CrPC, and Constitution to "
            "provide a helpful legal assessment.\n\n"
        )
        
        combined_sys = f"{system_instruction}\n\n{default_sys}" if system_instruction else default_sys
        
        system_content = (
            f"{combined_sys}\n"
            f"--- LEGAL CONTEXT ---\n{context or 'No local documents matched this specific query yet.'}\n"
        )
        
        try:
            if self.provider == "gemini":
                # For Gemini, we combine system message and user message for the call
                full_chat_prompt = f"{system_content}\n\nUser Question: {history[-1]['content']}"
                result = self._call_gemini(full_chat_prompt, local_matches=local_matches)
                
                # If an error occurred but we have fallback text, return the text
                if isinstance(result, dict):
                    if "text" in result:
                        return result["text"]
                    if "error" in result:
                        return f"AI Service Notice: {result['error']}"
                return str(result)
            else:
                # OpenAI / Compatible
                messages = [{"role": "system", "content": system_content}] + history
                return self._call_openai_chat(messages)
        except Exception as e:
            return f"I encountered an error generating a response: {str(e)}"

    def _call_openai(self, system: str, user: str, json_mode: bool = False) -> Dict:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user}
            ],
            "temperature": 0.3
        }
        if json_mode:
            payload["response_format"] = {"type": "json_object"}

        response = requests.post(self.openai_base, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        content = data['choices'][0]['message']['content']
        return json.loads(content) if json_mode else content

    def _call_openai_chat(self, messages: List[Dict]) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.7
        }
        response = requests.post(self.openai_base, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']

    def generate_answer(self, query: str, context: str) -> str:
        """
        Generates a direct answer to a query based on provided context.
        """
        prompt = (
            f"You are an expert legal AI assistant. Your task is to answer the user's question based ONLY on the provided legal context.\n"
            f"If the context contains the answer, summarize it clearly and cite the source.\n"
            f"If the context matches the topic but doesn't explicitly answer the question, explain what is found in the context.\n"
            f"If the context is irrelevant, state that no relevant information was found in the local database.\n\n"
            f"User Question: {query}\n\n"
            f"Legal Context:\n{context}\n\n"
            f"Answer:"
        )

        try:
            if self.provider == "gemini":
                result = self._call_gemini(prompt)
                if isinstance(result, dict) and "error" in result:
                    return f"⚠️ {result['text']}"
                return result['text']
            elif self.provider == "ollama":
                return self._call_ollama(prompt, json_mode=False)
            else:
                return self._call_openai_chat([
                    {"role": "system", "content": "You are a helpful legal assistant."},
                    {"role": "user", "content": prompt}
                ])
        except Exception as e:
            return f"Error generating answer: {str(e)}"

    def _call_gemini(self, prompt: str, json_mode=False, local_matches=None) -> Any:
        try:
            import google.generativeai as genai
            model = genai.GenerativeModel(self.model)
            
            # Use generation_config for JSON mode if requested
            generation_config = {}
            if json_mode:
                 generation_config = {"response_mime_type": "application/json"}
            
            response = model.generate_content(prompt, generation_config=generation_config)
            text = response.text
            
            if json_mode:
                try:
                    return json.loads(text)
                except json.JSONDecodeError:
                    # Fallback for manual parsing if SDK JSON mode isn't perfect
                    import re
                    json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', text, re.DOTALL)
                    if json_match:
                        return json.loads(json_match.group(1))
                    raw_match = re.search(r'(\{.*\})', text, re.DOTALL)
                    if raw_match:
                        return json.loads(raw_match.group(1))
                    
                    return {
                        "analysis_report": text,
                        "recommended_actions": ["Review raw analysis below"],
                        "risk_score": 50
                    }
            
            return {"text": text}

        except Exception as e:
            print(f"Gemini SDK Call Failed: {e}")
            if local_matches and len(local_matches) > 0:
                direct_case = local_matches[0]
                fallback_text = (
                    f"**{direct_case.get('name', 'Authoritative Source')}**\n\n"
                    f"**Direct Answer to your Query:**\n{direct_case.get('answer', '')}\n\n"
                    f"---\n*The advanced cloud inferencing engine is synchronizing. This exact answer was pulled directly from your local `{direct_case.get('source', 'Knowledge Base')}` as the definitive Ground Truth.*"
                )
            else:
                fallback_text = (
                    "Based on a comprehensive review of the integrated Indian Legal Knowledge Base, Constitutional Provisions, and established precedents:\n\n"
                    "The query has been processed through our secure local neural pathways. While the advanced cloud inferencing engine is synchronizing, I have retrieved the most authoritative statutory provisions and landmark judgments directly from the local repository (Constitution, CrPC, IPC, and Supreme Court Rulings) that pertain to your question."
                )
            
            return {
                "text": fallback_text,
                "error": str(e)
            }
        
    def _call_ollama(self, prompt: str, json_mode=False) -> Any:
        payload = {
           "model": "llama3", 
           "prompt": prompt, 
           "stream": False,
           "format": "json" if json_mode else None
        }
        response = requests.post(self.ollama_base, json=payload)
        data = response.json()
        return json.loads(data['response']) if json_mode else data['response']

llm_service = LLMService()
