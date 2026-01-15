
import re

FILE_PATH = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

def check_duplicates():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count occurrences of our ID
    count_container = content.count('id="nyaya-assist-custom-nav-container"')
    count_nav = content.count('id="nyaya-assist-custom-nav"')
    
    print(f"Container count: {count_container}")
    print(f"Nav ID count: {count_nav}")
    
    # Find all occurrences
    matches = [m.start() for m in re.finditer(r'id="nyaya-assist-custom-nav', content)]
    print(f"Matches found at indices: {matches}")

if __name__ == "__main__":
    check_duplicates()
