"""
AI-Powered Legal Chat for India's New Criminal Laws
Supports BNS (Bharatiya Nyaya Sanhita), BNSS (Bharatiya Nagarik Suraksha Sanhita),
and Bharatiya Sakshya Adhiniyam 2023.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import time
import random

router = APIRouter()

# ── Pydantic Models ──────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    role: str        # "user" | "assistant" | "system"
    content: str

class LegalChatRequest(BaseModel):
    messages: List[ChatMessage]
    mode: Optional[str] = "all"   # "all" | "bns" | "bnss" | "sakshya"

class LawReference(BaseModel):
    law: str          # "BNS" | "BNSS" | "Sakshya"
    section: str
    title: str

class LegalChatResponse(BaseModel):
    reply: str
    law_references: List[LawReference] = []

# ── System Prompts ────────────────────────────────────────────────────────────

BASE_SYSTEM_PROMPT = """You are NyayaAssist, an expert AI legal assistant specialising in India's new criminal laws that came into effect on 1 July 2024. You assist judges, lawyers, and police officers.

The three foundational laws you are trained on:

1. **Bharatiya Nyaya Sanhita (BNS) 2023** – Replaced the Indian Penal Code (IPC). Defines criminal offences and their punishments.
2. **Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023** – Replaced the Criminal Procedure Code (CrPC). Governs criminal procedure, arrest, trial, bail, etc.
3. **Bharatiya Sakshya Adhiniyam (BSA) 2023** – Replaced the Indian Evidence Act. Governs admissibility and weight of evidence, including electronic and forensic evidence.

RESPONSE FORMAT (always use this structure):
1. **Title**: Clear legal title of the topic/issue.
2. **Applicable Law & Sections**: Cite the exact section numbers from BNS/BNSS/BSA (e.g., "BNS Section 303 – Theft").
3. **Legal Analysis**: Detailed interpretation of how the law applies to the specific facts.
4. **Key Points**:
   - Bullet point summary of actionable legal facts.
5. **Procedural Steps** (if BNSS is relevant): Step-by-step procedure required.
6. **Evidence Standards** (if BSA is relevant): Admissibility and burden of proof analysis.
7. **Conclusion**: Practical legal advice and next steps.

Important rules:
- Always reference specific section numbers from BNS, BNSS, or BSA 2023 (NOT from IPC, CrPC, or old Evidence Act).
- If a question refers to old law (e.g., "IPC Section 300"), map it to the equivalent new law section.
- If unsure of the exact section number, provide your best interpretation and note uncertainty.
- Maintain a professional, authoritative legal tone suitable for courtroom practitioners.
- For case scenarios, analyse from all three dimensions: offence (BNS), procedure (BNSS), and evidence (BSA).
"""

MODE_SUPPLEMENTS = {
    "bns": "\nFOCUS: Answer exclusively using the Bharatiya Nyaya Sanhita (BNS) 2023. Do not cite BNSS or BSA unless directly asked.\n",
    "bnss": "\nFOCUS: Answer exclusively using the Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 (procedure, arrest, bail, trial). Do not cite BNS or BSA unless directly asked.\n",
    "sakshya": "\nFOCUS: Answer exclusively using the Bharatiya Sakshya Adhiniyam (BSA) 2023 (evidence, admissibility, burden of proof). Do not cite BNS or BNSS unless directly asked.\n",
    "all": "\nFOCUS: Provide a comprehensive analysis using all three laws (BNS, BNSS, BSA) as applicable to the facts presented.\n",
}

# ── Key Section Reference Map (for law_references extraction) ─────────────────

LAW_SECTION_HINTS = {
    "BNS": [
        "theft", "robbery", "murder", "assault", "fraud", "forgery", "hurt",
        "kidnapping", "extortion", "cheating", "defamation", "rape", "dacoity",
        "criminal breach of trust", "abetment", "conspiracy", "mischief",
    ],
    "BNSS": [
        "arrest", "bail", "charge", "chargesheet", "fir", "investigation",
        "warrant", "summons", "trial", "appeal", "remand", "custody",
        "cognizable", "non-cognizable", "magistrate", "sessions",
    ],
    "BSA": [
        "evidence", "witness", "testimony", "forensic", "fingerprint",
        "electronic", "digital", "document", "confession", "admission",
        "burden of proof", "presumption", "expert", "circumstantial",
    ],
}

def extract_law_references(reply_text: str) -> List[LawReference]:
    """Heuristically extract cited law references from the AI reply."""
    import re
    refs = []
    seen = set()

    # Pattern: BNS Section 303, BNSS Section 35, BSA Section 55, etc.
    patterns = [
        (r'BNS\s+[Ss]ection\s+(\d+(?:\([^)]+\))?)', "BNS"),
        (r'BNSS\s+[Ss]ection\s+(\d+(?:\([^)]+\))?)', "BNSS"),
        (r'BSA\s+[Ss]ection\s+(\d+(?:\([^)]+\))?)', "BSA"),
        (r'Bharatiya Nyaya Sanhita.*?[Ss]ection\s+(\d+)', "BNS"),
        (r'Bharatiya Nagarik Suraksha Sanhita.*?[Ss]ection\s+(\d+)', "BNSS"),
        (r'Bharatiya Sakshya Adhiniyam.*?[Ss]ection\s+(\d+)', "BSA"),
        (r'[Ss]ection\s+(\d+)\s+of\s+(?:the\s+)?BNS', "BNS"),
        (r'[Ss]ection\s+(\d+)\s+of\s+(?:the\s+)?BNSS', "BNSS"),
        (r'[Ss]ection\s+(\d+)\s+of\s+(?:the\s+)?(?:BSA|Bharatiya Sakshya)', "BSA"),
    ]

    for pattern, law in patterns:
        for match in re.finditer(pattern, reply_text):
            section = match.group(1)
            key = f"{law}-{section}"
            if key not in seen:
                seen.add(key)
                refs.append(LawReference(
                    law=law,
                    section=f"Section {section}",
                    title=f"{law} § {section}"
                ))

    return refs[:8]  # Cap at 8 references

# ── Exponential Backoff ───────────────────────────────────────────────────────

def with_exponential_backoff(func, max_retries=4, base_delay=1.0, max_backoff=16.0):
    """Retry with exponential backoff + jitter."""
    retries = 0
    delay = base_delay
    last_exc = None
    while retries <= max_retries:
        try:
            return func()
        except Exception as e:
            last_exc = e
            print(f"[LegalChat] Attempt {retries + 1} failed: {e}")
            wait = min(delay + random.uniform(0, delay * 0.5), max_backoff)
            time.sleep(wait)
            delay = min(delay * 2, max_backoff)
            retries += 1
    raise last_exc

# ── Endpoint ──────────────────────────────────────────────────────────────────

@router.post("/", response_model=LegalChatResponse)
async def legal_chat(request: LegalChatRequest):
    """
    AI chat endpoint specialised for India's new criminal laws (BNS, BNSS, BSA 2023).
    """
    from app.services.llm_service import llm_service

    mode = request.mode or "all"
    supplement = MODE_SUPPLEMENTS.get(mode, MODE_SUPPLEMENTS["all"])
    system_prompt = BASE_SYSTEM_PROMPT + supplement

    # Build history in the format llm_service expects
    history = [
        {"role": msg.role, "content": msg.content}
        for msg in request.messages
        if msg.role in ("user", "assistant")
    ]

    if not history:
        raise HTTPException(status_code=400, detail="No messages provided.")

    # Call LLM with retries
    try:
        def call_llm():
            return llm_service.chat_completion(history, context=system_prompt)

        reply = with_exponential_backoff(call_llm)

        if not reply or reply.strip() == "":
            reply = "I was unable to generate a response. Please try again."

    except Exception as e:
        print(f"[LegalChat] All retries failed: {e}")
        raise HTTPException(
            status_code=503,
            detail=f"AI service temporarily unavailable: {str(e)}"
        )

    law_references = extract_law_references(reply)

    return LegalChatResponse(reply=reply, law_references=law_references)
