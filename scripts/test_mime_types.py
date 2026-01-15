import requests

# Test the MIME types being served
test_files = [
    "/template-portal/legalzoomcdn.net/margo/assets/manifest-0486b443.js",
    "/template-portal/legalzoomcdn.net/margo/assets/template-preview-BjAgz2U8.css",
]

base_url = "http://localhost:8000"

print("Testing MIME Types After Server Restart\n" + "="*50)

for file_path in test_files:
    url = base_url + file_path
    try:
        response = requests.head(url, timeout=5)
        content_type = response.headers.get('content-type', 'NOT SET')
        status = response.status_code
        
        print(f"\nFile: {file_path.split('/')[-1]}")
        print(f"Status: {status}")
        print(f"Content-Type: {content_type}")
        
        # Check if correct
        if file_path.endswith('.js'):
            if 'application/javascript' in content_type:
                print("✅ CORRECT - JavaScript MIME type")
            else:
                print(f"❌ WRONG - Expected 'application/javascript', got '{content_type}'")
        elif file_path.endswith('.css'):
            if 'text/css' in content_type:
                print("✅ CORRECT - CSS MIME type")
            else:
                print(f"❌ WRONG - Expected 'text/css', got '{content_type}'")
                
    except Exception as e:
        print(f"\n❌ Error fetching {file_path}: {e}")

print("\n" + "="*50)
