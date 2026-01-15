"""
Remove footer from all HTML template files
This script removes the footer component that was previously added
"""

import os
import re
from pathlib import Path

def remove_footer_from_html(file_path):
    """Remove footer from an HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if footer exists
        if '<!-- Footer -->' not in content:
            return False, "No footer found"
        
        # Pattern to match the entire footer section
        # Matches from <!-- Footer --> to </footer> including whitespace
        footer_pattern = r'\s*<!-- Footer -->.*?</footer>\s*'
        
        # Remove the footer
        new_content = re.sub(footer_pattern, '\n', content, flags=re.DOTALL)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True, "Footer removed successfully"
    
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    # Base directory
    base_dir = Path(r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates")
    
    # Find all HTML files
    html_files = list(base_dir.rglob("*.html"))
    
    print(f"Found {len(html_files)} HTML files")
    print("=" * 60)
    
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for html_file in html_files:
        success, message = remove_footer_from_html(html_file)
        
        if success:
            success_count += 1
            print(f"Removed: {html_file.name}")
        elif "No footer found" in message:
            skip_count += 1
        else:
            error_count += 1
            print(f"Error in {html_file.name}: {message}")
    
    print("=" * 60)
    print(f"\nSummary:")
    print(f"  Successfully removed footer: {success_count}")
    print(f"  Skipped (no footer): {skip_count}")
    print(f"  Errors: {error_count}")
    print(f"  Total files processed: {len(html_files)}")

if __name__ == "__main__":
    main()
