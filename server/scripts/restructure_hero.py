import os

file_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

# Unique identifier for the block we injected
services_style_start = '<div style="margin-top: 40px; background: rgba(255,255,255,0.9);'
services_block_marker = 'Official Judiciary Services'

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Locate the Services Block
    start_services = content.find(services_style_start)
    if start_services == -1:
        print("Could not find the Services Block to move. Was it injected?")
        # Fallback: Check if the text is there but style changed (unlikely unless user edited)
        if services_block_marker in content:
            print("Found marker but not style start. Content might be different.")
        exit(1)

    # Find the end of this div. 
    # Since we know the content we injected, we can try to assume it ends at a </div> after specific keywords.
    # The last link is ePay.
    last_item = 'ePay</span>\n      </a>\n  </div>\n</div>'
    # Actually, whitespace might differ.
    
    # Robust way: Count nested divs? 
    # Or just find the string segment we injected in update_hero_services.py
    # The injected payload ends with: </a>\n  </div>\n</div> (approx)
    
    # Let's count braces to find the matching closing div for start_services
    # Scan forward from start_services
    
    open_divs = 0
    end_services = -1
    
    # We'll just look for the known end of our injected string from the previous step.
    # But wait, we replaced the inner grid, not the outer container.
    # The outer container ends with </div>
    # The outer container starts at start_services.
    
    current_pos = start_services
    # It starts with <div ...> (1 open)
    # We need to parse properly.
    
    cnt = 0
    box_end = -1
    for i in range(start_services, len(content)):
        if content[i:i+4] == "<div":
            cnt += 1
        elif content[i:i+5] == "</div":
            cnt -= 1
            if cnt == 0:
                box_end = i + 6 # include </div>
                break
                
    if box_end == -1:
        print("Could not find closing div for services block.")
        exit(1)
        
    services_html = content[start_services:box_end]
    
    # 2. Locate the H1 and P preceding it.
    # We search backwards from start_services for </h1> and </p>
    
    # The injection was: ... </p> [Services]
    # So immediately before start_services (ignoring whitespace), we should find </p>.
    
    preceding_text = content[:start_services].rstrip()
    if not preceding_text.endswith("</p>"):
        print("Warning: Content immediately before services block is not </p>. Proceeding with caution.")
    
    # We want to wrap the H1 and P.
    # Let's find the H1 start.
    # "Attorney-Drafted Templates" is the marker.
    h1_marker = "Attorney-Drafted Templates"
    h1_content_loc = content.rfind(h1_marker, 0, start_services)
    
    if h1_content_loc == -1:
        print("Could not find H1 content.")
        exit(1)
        
    # Find start of H1 tag
    h1_start = content.rfind("<h1", 0, h1_content_loc)
    
    # We will wrap from h1_start to start_services (exclusive) into Left Column
    # And start_services to box_end into Right Column.
    
    left_col_content = content[h1_start:start_services].strip()
    right_col_content = services_html
    
    # 3. Construct the new Flex Layout
    # Styles:
    # Flex container: display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 4rem;
    # Left col: flex: 1; min-width: 300px; text-align: left; (maybe?)
    # Right col: flex: 1; min-width: 300px;
    
    # Additionally, we might need to remove some styling from the services block (margin-top: 40px) to make it align better.
    right_col_content = right_col_content.replace("margin-top: 40px;", "margin-top: 0;")
    
    new_layout = f"""
    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 40px; margin-top: 2rem;">
       <div style="flex: 1 1 500px; min-width: 300px;">
          {left_col_content}
       </div>
       <div style="flex: 1 1 400px; min-width: 300px;">
          {right_col_content}
       </div>
    </div>
    """
    
    # Replace the range [h1_start : box_end] with new_layout
    final_content = content[:h1_start] + new_layout + content[box_end:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
        
    print("Successfully restructured Hero section to side-by-side layout.")

except Exception as e:
    print(f"Error: {e}")
