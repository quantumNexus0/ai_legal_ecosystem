import requests
import json
import time

def test_analysis():
    url = "http://127.0.0.1:8001/api/analysis/analyze"
    payload = {
        "facts": "A person was caught red-handed while stealing a mobile phone from a shop in Delhi.",
        "parties": "State vs. Unknown",
        "stage": "Filing",
        "issues": "Theft under IPC. What are the legal implications?",
        "sections": "IPC 379",
        "additional_info": ""
    }
    
    print(f"Sending request to {url}...")
    start_time = time.time()
    try:
        response = requests.post(url, json=payload, timeout=60)
        end_time = time.time()
        print(f"Request took {end_time - start_time:.2f} seconds")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("Response Analysis (first 200 chars):")
            print(data.get("analysis", "")[:200] + "...")
            print(f"Risk Score: {data.get('risk_score')}")
            print(f"Recommended Actions: {data.get('recommended_actions')}")
        else:
            print(f"Error Response: {response.text}")
    except Exception as e:
        print(f"Error occurred: {e}")

if __name__ == "__main__":
    test_analysis()
