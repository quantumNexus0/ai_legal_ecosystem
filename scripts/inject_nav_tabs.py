
import os
import re

FILE_PATH = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

# Enhanced Responsive HTML with Styles
NAV_HTML = """
<div id="nyaya-assist-custom-nav-container">
<style>
    #nyaya-assist-custom-nav {
        background: white;
        border-bottom: 1px solid #e5e7eb;
        padding: 0.75rem 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        position: sticky;
        top: 0;
        z-index: 99999;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        flex-wrap: wrap;
    }
    .nyaya-logo-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .nyaya-nav-links {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }
    .nyaya-nav-item {
        text-decoration: none;
        color: #4b5563;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        transition: all 0.2s;
        white-space: nowrap;
    }
    .nyaya-nav-item:hover {
        color: #2563eb;
        background-color: #f3f4f6;
    }
    .nyaya-nav-item.active {
        color: #2563eb;
        background-color: #eff6ff;
    }
    
    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
        #nyaya-assist-custom-nav {
            padding: 0.75rem 1rem;
            flex-direction: column;
            gap: 1rem;
        }
        .nyaya-nav-links {
            width: 100%;
            justify-content: space-between;
            gap: 0.25rem;
        }
        .nyaya-nav-item {
            padding: 0.5rem 0.5rem;
            font-size: 0.7rem;
            flex: 1;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .nyaya-spacer {
            display: none;
        }
    }
</style>

<div id="nyaya-assist-custom-nav">
    <div class="nyaya-logo-group">
        <div style="background-color: #2563eb; padding: 0.5rem; border-radius: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
        </div>
        <span style="font-size: 1.25rem; font-weight: 800; color: #111827; letter-spacing: -0.025em; text-transform: uppercase;">Nyaya<span style="color: #2563eb;">Assist</span></span>
    </div>
    
    <div class="nyaya-nav-links">
        <a href="http://localhost:5173" class="nyaya-nav-item">
            Platform
        </a>
        <a href="#" class="nyaya-nav-item active">
            Templates
        </a>
        <a href="http://localhost:5174" class="nyaya-nav-item">
            AI Analyzer
        </a>
    </div>
    
    <div class="nyaya-spacer" style="width: 100px;"></div> 
</div>
</div>
"""

def clean_and_inject():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    print("Cleaning up ANY previous injections...")
    
    # 1. Broadly remove any div with our specific IDs
    # Removing the Container version
    # Pattern: <div id="nyaya-assist-custom-nav-container"> ... </div>
    # Using a loop to remove multiple instances if they exist
    while True:
        new_content = re.sub(r'<div id="nyaya-assist-custom-nav-container">.*?</div>\s*</div>', '', content, flags=re.DOTALL)
        if new_content == content:
            break
        print(" -> Removed a container instance.")
        content = new_content

    # Removing the Standalone version (first iteration)
    # Pattern: <div id="nyaya-assist-custom-nav" ... > ... </div>
    # Note: The standalone version didn't have the container, so we look for the div start and end.
    # It ended with <div style="width: 100px;"></div>\n</div>
    while True:
        # Match from <div id="nyaya-assist-custom-nav" to the closing </div> of that main div
        # Since regex is greedy or not enough, let's try a fairly specific block removal
        # The previous non-responsive one looked like: <div id="nyaya-assist-custom-nav" style="..."> ... </div>
        new_content = re.sub(r'<div id="nyaya-assist-custom-nav".*?width: 100px;"></div>\s*</div>', '', content, flags=re.DOTALL)
        if new_content == content:
            break
        print(" -> Removed a standalone instance.")
        content = new_content
        
    # verify cleanup
    if 'nyaya-assist' in content:
        print("WARNING: Traces of nyaya-assist still found. Attempting aggressive cleanup.")
        # Fallback: remove lines containing that ID if regex failed due to newlines
        lines = content.splitlines()
        clean_lines = []
        skip = False
        for line in lines:
            if 'id="nyaya-assist-custom-nav-container"' in line:
                skip = True
            if 'id="nyaya-assist-custom-nav"' in line and not skip: # Start of standalone
                 # Only if we aren't already skipping (container handles its own children)
                 # This is tricky without a state machine, but let's assume the regexs caught most.
                 pass
            
            # This is risky. Let's rely on the regex above but improved.
            clean_lines.append(line)
        # Re-save? No, stick to Regex.
        
        # Try one more regex for the standalone style block
        content = re.sub(r'<div id="nyaya-assist-custom-nav"[^>]*>.*?</div>', '', content, flags=re.DOTALL)

    # 2. Inject SINGLE new instance
    match = re.search(r'<body[^>]*>', content)
    if match:
        print("Found body tag. Injecting SINGLE responsive nav...")
        end_pos = match.end()
        final_content = content[:end_pos] + "\n" + NAV_HTML + content[end_pos:]
        
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            f.write(final_content)
        print("Success! Cleaned and injected.")
    else:
        print("Could not find body tag.")

if __name__ == "__main__":
    clean_and_inject()
