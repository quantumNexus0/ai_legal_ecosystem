import sys
import os

# Add parent dir to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.llm_service import llm_service
import dotenv

# Load env variables from server/.env
dotenv.load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env'))

print(f"Testing LLM Provider: {os.getenv('LLM_PROVIDER')}")
print(f"API Key present: {'Yes' if os.getenv('LLM_API_KEY') else 'No'}")

try:
    print("\n--- Sending Test Request to LLM ---")
    response = llm_service.generate_analysis(
        "You are a helpful assistant. Return a JSON with a greeting.", 
        "Say hello."
    )
    print("\n--- Response Received ---")
    print(response)
    
    if "error" in response:
        print("\n[FAIL] LLM Service returned an error.")
    else:
        print("\n[SUCCESS] LLM Service is working.")

except Exception as e:
    print(f"\n[CRITICAL FAIL] Exception occurred: {e}")
