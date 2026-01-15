import re

# Read the HTML file
html_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all modulepreload links
# Pattern: href="../../legalzoomcdn.net/ or href="../../www. or href="../../cdn.
pattern = r'(<link\s+rel="modulepreload"\s+href=")\.\.\/\.\.\/([^"]+)"'
replacement = r'\1/template-portal/\2"'

content_fixed = re.sub(pattern, replacement, content)

# Count replacements
count = len(re.findall(pattern, content))

# Write back
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content_fixed)

print(f"✅ Fixed {count} modulepreload links in index.html")
print(f"   Changed: href=\"../../path\" → href=\"/template-portal/path\"")
