import requests

# URL of a known CSS file. Based on previous file listings:
# We know there is a 'legalzoomcdn.net' folder. Let's guess a path or find a real one.
# shared/templates/templates/legalzoomcdn.net/margo/assets/template-preview-BjAgz2U8.css 
# This file was referenced in amendment-of-agreement.html line 38:
# href="/template-portal/legalzoomcdn.net/margo/assets/template-preview-BjAgz2U8.css"

url = "http://localhost:8000/template-portal/legalzoomcdn.net/margo/assets/template-preview-BjAgz2U8.css"

try:
    response = requests.head(url)
    print(f"Status Code: {response.status_code}")
    print("Headers:")
    for k, v in response.headers.items():
        print(f"{k}: {v}")
except Exception as e:
    print(f"Error fetching URL: {e}")
