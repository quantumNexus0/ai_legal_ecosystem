import os
import sys
import subprocess
from pyngrok import ngrok

# Navigate to the server root directory so we can run uvicorn properly
server_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(server_dir)

def main():
    print("="*60)
    print("Starting Nyaya AI Backend with Ngrok...")
    print("="*60)
    
    public_url = None
    try:
        # Start a pyngrok tunnel on port 8000
        # By default, pyngrok will look for ngrok auth token config on the system
        public_url = ngrok.connect(8000).public_url
        print("\n\n" + "*"*60)
        print("NGROK TUNNEL CREATED SUCCESSFULLY!")
        print(f"Public URL: {public_url}")
        print(f"Access the application via: {public_url}/nyaya/")
        print("*"*60 + "\n\n")
    except Exception as e:
        print(f"Failed to start Ngrok tunnel: {e}")
        print("Please ensure pyngrok is installed: pip install pyngrok")
        print("If it requires authentication, run: ngrok config add-authtoken <TOKEN>")
        sys.exit(1)

    # Start the FastAPI/uvicorn server
    print("Starting Uvicorn Server on port 8000...\n")
    try:
        subprocess.run([sys.executable, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"])
    except KeyboardInterrupt:
        print("User interrupted.")
    finally:
        # Cleanup
        if public_url:
            print("\nDisconnecting Ngrok tunnel...")
            ngrok.disconnect(public_url)
            ngrok.kill()

if __name__ == "__main__":
    main()
