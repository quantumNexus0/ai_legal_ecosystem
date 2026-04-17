"""
ai_service.py — Correct Gemini AI integration for structured legal case analysis.
Returns well-formed JSON with case type, applicable laws, precedents, risk score,
strategies, summary, and disclaimer.
"""
import os
import json
import google.generativeai as genai
from typing import Optional

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

ANALYSIS_SYSTEM_PROMPT = """You are NyayaAssist, an expert Indian legal AI assistant.
Analyze the given case facts and respond ONLY with valid JSON in this exact format:
{
  "case_type": "string (e.g. Criminal / Civil / Family / Property / Consumer)",
  "applicable_laws": ["List of relevant IPC/CrPC/CPC sections or Acts"],
  "precedents": [
    {"case_name": "string", "year": 2023, "court": "string", "relevance": "string"}
  ],
  "risk_score": 7,
  "strategies": ["Strategy 1", "Strategy 2", "Strategy 3"],
  "summary": "Brief plain-language summary of the situation",
  "disclaimer": "This analysis is AI-generated and not a substitute for professional legal advice."
}
Do NOT include any text outside the JSON object."""


async def analyze_case(case_facts: str, context: Optional[str] = None) -> dict:
    """Analyze case facts using Gemini and return structured JSON."""
    model = genai.GenerativeModel("gemini-1.5-flash")

    user_message = f"Case Facts:\n{case_facts}"
    if context:
        user_message += f"\n\nAdditional Context:\n{context}"

    try:
        response = model.generate_content(
            [ANALYSIS_SYSTEM_PROMPT, user_message],
            generation_config=genai.types.GenerationConfig(
                temperature=0.2,
                max_output_tokens=1500,
            )
        )

        raw = response.text.strip()
        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]

        return json.loads(raw.strip())

    except json.JSONDecodeError:
        return {
            "error": "AI response was not valid JSON",
            "raw_response": response.text[:500]
        }
    except Exception as e:
        return {"error": str(e)}
