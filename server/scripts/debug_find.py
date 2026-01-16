import os

file_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    term = "Official Judiciary Services"
    idx = content.find(term)
    
    if idx != -1:
        print(f"Found '{term}' at index {idx}")
        print("Context:")
        print(content[idx-100:idx+200])
    else:
        print(f"'{term}' NOT FOUND in file.")
        
        # Try looser search
        term2 = "High Court Services"
        idx2 = content.find(term2)
        if idx2 != -1:
             print(f"Found '{term2}' at {idx2}")
             print(content[idx2-100:idx2+200])
        else:
             print("Nothing found.")

except Exception as e:
    print(e)
