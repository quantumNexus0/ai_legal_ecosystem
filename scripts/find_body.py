
import os

FILE_PATH = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

def find_body_start():
    try:
        with open(FILE_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
            
        body_index = content.find("<body")
        if body_index != -1:
            print(f"Found <body> at index {body_index}")
            # Print context around body tag
            start = max(0, body_index - 100)
            end = min(len(content), body_index + 1000)
            print(content[start:end])
        else:
            print("Could not find <body> tag")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    find_body_start()
