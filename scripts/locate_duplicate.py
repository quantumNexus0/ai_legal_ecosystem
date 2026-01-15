
import os

FILE_PATH = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

def find_lines():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        if "Legal Services Platform" in line:
            print(f"Match at line {i+1}: {line.strip()}")
            # Print surrounding lines
            start = max(0, i-5)
            end = min(len(lines), i+5)
            for j in range(start, end):
                print(f"{j+1}: {lines[j].strip()}")

if __name__ == "__main__":
    find_lines()
