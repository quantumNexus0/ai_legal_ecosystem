
import re

FILE_PATH = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

def check_context():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    matches = list(re.finditer(r'(<div[^>]*id="nyaya-assist[^>]*>)', content))
    
    print(f"Total Matches: {len(matches)}")
    for i, m in enumerate(matches):
        print(f"--- Match {i+1} ---")
        print(f"Tag: {m.group(0)}")
        print(f"Context: {content[m.start()-50:m.end()+50]}")
        print("----------------")

if __name__ == "__main__":
    check_context()
