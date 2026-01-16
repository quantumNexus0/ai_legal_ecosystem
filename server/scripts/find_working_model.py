import requests
import os
import dotenv

# Load env to get key
dotenv.load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env'))
api_key = os.getenv("LLM_API_KEY")

print(f"Testing with API Key: {api_key[:10]}...")

candidates = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-001",
    "gemini-1.5-pro",
    "gemini-1.5-pro-latest",
    "gemini-1.0-pro",
    "gemini-pro"
]

working_model = None

for model in candidates:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    print(f"Testing {model}...", end=" ")
    try:
        resp = requests.post(url, json={"contents":[{"parts":[{"text":"Hi"}]}]}, timeout=5)
        if resp.status_code == 200:
            print("[SUCCESS] 200 OK")
            working_model = model
            break
        else:
            print(f"[FAIL] {resp.status_code} - {resp.text[:50]}")
    except Exception as e:
        print(f"[ERROR] {e}")

if working_model:
    print(f"\nFOUND WORKING MODEL: {working_model}")
else:
    print("\nNO WORKING MODELS FOUND. CHECK KEY/QUOTA.")
