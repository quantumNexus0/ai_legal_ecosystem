"""
Add footer to all HTML template files
This script adds the footer component before the closing </body> tag in all HTML files
"""

import os
import re
from pathlib import Path

# Footer HTML content
FOOTER_HTML = '''
  <!-- Footer -->
  <footer style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 3rem 1rem 1.5rem; margin-top: 4rem;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <!-- Footer Content -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
        
        <!-- About Section -->
        <div>
          <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; color: #fbbf24;">AI Legal Ecosystem</h3>
          <p style="color: #e0e7ff; line-height: 1.6; font-size: 0.9rem;">
            Your comprehensive platform for legal document templates, AI-powered assistance, and professional legal services.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; color: #fbbf24;">Quick Links</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;">
              <a href="/template-portal" style="color: #e0e7ff; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'">
                Templates
              </a>
            </li>
            <li style="margin-bottom: 0.5rem;">
              <a href="/ai-assistant" style="color: #e0e7ff; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'">
                AI Assistant
              </a>
            </li>
            <li style="margin-bottom: 0.5rem;">
              <a href="/lawyers" style="color: #e0e7ff; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'">
                Find Lawyers
              </a>
            </li>
            <li style="margin-bottom: 0.5rem;">
              <a href="/about" style="color: #e0e7ff; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; color: #fbbf24;">Legal</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;">
              <a href="/privacy" style="color: #e0e7ff; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'">
                Privacy Policy
              </a>
            </li>
            <li style="margin-bottom: 0.5rem;">
              <a href="/terms" style="color: #e0e7ff; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'">
                Terms of Service
              </a>
            </li>
            <li style="margin-bottom: 0.5rem;">
              <a href="/disclaimer" style="color: #e0e7ff; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'">
                Disclaimer
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; color: #fbbf24;">Contact</h4>
          <ul style="list-style: none; padding: 0; margin: 0; color: #e0e7ff; font-size: 0.9rem;">
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center;">
              <svg style="width: 1.2rem; height: 1.2rem; margin-right: 0.5rem;" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              support@ailegal.com
            </li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center;">
              <svg style="width: 1.2rem; height: 1.2rem; margin-right: 0.5rem;" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              +1 (555) 123-4567
            </li>
            <li style="display: flex; align-items: center;">
              <svg style="width: 1.2rem; height: 1.2rem; margin-right: 0.5rem;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              New York, NY 10001
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.2); margin: 2rem 0 1.5rem;"></div>

      <!-- Bottom Bar -->
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
        <p style="margin: 0; color: #e0e7ff; font-size: 0.9rem;">
          © 2026 AI Legal Ecosystem. All rights reserved.
        </p>
        
        <!-- Social Links -->
        <div style="display: flex; gap: 1rem;">
          <a href="#" style="color: #e0e7ff; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'" aria-label="Facebook">
            <svg style="width: 1.5rem; height: 1.5rem;" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" style="color: #e0e7ff; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'" aria-label="Twitter">
            <svg style="width: 1.5rem; height: 1.5rem;" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="#" style="color: #e0e7ff; transition: color 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#e0e7ff'" aria-label="LinkedIn">
            <svg style="width: 1.5rem; height: 1.5rem;" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
'''

def add_footer_to_html(file_path):
    """Add footer to an HTML file if it doesn't already have one"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if footer already exists
        if '<!-- Footer -->' in content or 'AI Legal Ecosystem. All rights reserved' in content:
            return False, "Footer already exists"
        
        # Find the closing </body> tag
        body_close_pattern = r'</body>'
        match = re.search(body_close_pattern, content, re.IGNORECASE)
        
        if not match:
            return False, "No </body> tag found"
        
        # Insert footer before </body>
        new_content = content[:match.start()] + FOOTER_HTML + '\n' + content[match.start():]
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True, "Footer added successfully"
    
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
        success, message = add_footer_to_html(html_file)
        
        if success:
            success_count += 1
            print(f"✓ {html_file.relative_to(base_dir)}")
        elif "already exists" in message:
            skip_count += 1
            print(f"⊘ {html_file.relative_to(base_dir)} - {message}")
        else:
            error_count += 1
            print(f"✗ {html_file.relative_to(base_dir)} - {message}")
    
    print("=" * 60)
    print(f"\nSummary:")
    print(f"  ✓ Successfully added footer: {success_count}")
    print(f"  ⊘ Skipped (already has footer): {skip_count}")
    print(f"  ✗ Errors: {error_count}")
    print(f"  Total files processed: {len(html_files)}")

if __name__ == "__main__":
    main()
