import os
import re

file_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Identify the key components
    # A. The Government Services Block (We know the unique style string)
    services_start_marker = '<div style="margin-top: 40px; background: rgba(255,255,255,0.9);'
    
    # B. The start of the Hero Content (Title)
    # Based on the screenshot, it says "Create documents easily with templates,"
    hero_title_marker = "Create documents easily with templates,"
    
    # C. The end of the "Left Column" content
    # This is trickier. It includes the search bar and the 4 icons.
    # The screenshot shows the last icon text is "...securely in one place".
    # Or we can look for where the services block currently starts, since we appended it.
    
    start_services_idx = content.find(services_start_marker)
    if start_services_idx == -1:
        print("Could not find services block.")
        exit(1)

    # Find where the services block ends
    # It ends with </div> just before </body> or inside the container.
    # We can use a simpler approach: finding the closing `</div>` for the services block.
    # We know the content of the services block roughly.
    # It has `ePay` and then `</div></div>` (grid close, outer close)
    
    services_end_marker = "ePay</span>\n      </a>\n  </div>\n</div>"
    services_end_idx = content.find(services_end_marker)
    
    if services_end_idx == -1:
        # Tighter search
        services_end_marker = "ePay"
        services_end_idx = content.find(services_end_marker)
        if services_end_idx != -1:
             # Find the </div> closes after this.
             # We need to close: 1. ePay card </a>, 2. Grid div </div>, 3. Outer div </div>
             pass
    
    # Let's locate the full services HTML string to move it.
    # We will slice from start_services_idx to the end of the div.
    # We can iterate to find the matching closing div.
    
    div_count = 0
    services_html_end = -1
    for i in range(start_services_idx, len(content)):
        if content[i:i+4] == "<div":
            div_count += 1
        elif content[i:i+6] == "</div>":
            div_count -= 1
            if div_count == 0:
                services_html_end = i + 6
                break
    
    if services_html_end == -1:
        print("Could not parse services block end.")
        exit(1)
        
    services_html = content[start_services_idx:services_html_end]
    
    # 2. Identify the wrapping point for the Left Column
    # The Left Column should start where the Hero text starts.
    # And it should end right before where the Services block WAS (start_services_idx).
    
    # Locating Hero Title
    title_idx = content.find(hero_title_marker)
    # We need the <h1> tag before this text.
    h1_start_idx = content.rfind("<h1", 0, title_idx)
    
    if h1_start_idx == -1:
        # Maybe it's h2 or just text? 
        # Let's look for the container start.
        # User said "Hero section".
        # Let's try to assume the container is `div class="container"` or similar surrounding this.
        pass
    
    # Strategy:
    # Everything from `h1_start_idx` to `start_services_idx` is the "Left Column Content".
    # We will wrap that in a div.
    # We will wrap `services_html` in a div.
    # We will wrap BOTH in a flex container.
    
    left_content = content[h1_start_idx:start_services_idx]
    
    # Check if we captured too much or too little.
    # The `left_content` should include the search bar and icons.
    # Since we appended services block at the END of that section in previous steps, 
    # `start_services_idx` should be the correct split point.
    
    # Clean up any potential double-nesting from previous runs
    if "display: flex" in content[h1_start_idx-100:h1_start_idx]:
        print("Flex container already seems to exist? Replacing it.")
        # If we already wrapped it, we might be messing up.
        # For now, assume we are fixing the "stacked" state.
    
    # Create the new layout HTML
    # Removing top margin from services to align with H1
    services_html_clean = services_html.replace("margin-top: 40px;", "margin-top: 0;")
    
    new_layout = f"""
    <div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 40px; margin-top: 2rem;">
       <!-- Left Column -->
       <div style="flex: 1 1 500px; min-width: 300px; max-width: 800px;">
          {left_content}
       </div>
       
       <!-- Right Column -->
       <div style="flex: 1 1 400px; min-width: 300px; max-width: 500px;">
          {services_html_clean}
       </div>
    </div>
    """
    
    # Construct final file
    # Head + Pre-Hero + New Layout + Post-Hero (which is effectively empty since services was at end?)
    
    # Wait, `services_html_end` was the end of the services block.
    # So we replace range [h1_start_idx : services_html_end] with new_layout.
    
    final_content = content[:h1_start_idx] + new_layout + content[services_html_end:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
        
    print("Successfully restructured Index.html Hero.")

except Exception as e:
    print(f"Error: {e}")
