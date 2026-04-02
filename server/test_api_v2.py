import requests
import json

BASE_URL = "http://localhost:8000"

def test_top_judgments():
    print("Testing /api/analysis/top-judgments...")
    try:
        response = requests.get(f"{BASE_URL}/api/analysis/top-judgments")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Found {len(data['results'])} judgments.")
            if data['results']:
                print(f"First result: {data['results'][0]['title']}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Request failed: {e}")

def test_analyze():
    print("\nTesting /api/analysis/analyze...")
    payload = {
        "facts": "Maj. Gen. Manomoy Ganguly and Armed Forces Tribunal",
        "parties": "Unon of India vs Maj. Gen. Manomoy Ganguly",
        "stage": "Pre-litigation",
        "issues": "Promotion of Maj. Gen. Manomoy Ganguly",
        "sections": "Armed Forces Tribunal Act",
        "additional_info": ""
    }
    try:
        response = requests.post(f"{BASE_URL}/api/analysis/analyze", json=payload)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("Strong Points:", data['strong_points'][:2])
            print("Matched Cases count:", len(data['matched_cases']))
            if data['matched_cases']:
                print("First matched case Ratio (Answer):", data['matched_cases'][0]['ratio'][:50] + "...")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_top_judgments()
    test_analyze()
