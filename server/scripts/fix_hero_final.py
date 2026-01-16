import os

file_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Locate markers
    term_services = "Official Judiciary Services"
    idx_services_text = content.find(term_services)
    
    if idx_services_text == -1:
        print("Could not find Services text.")
        exit(1)
        
    style_marker = "background: rgba(255,255,255,0.9)"
    start_services_idx = content.rfind(style_marker, 0, idx_services_text)
    # Find the <div that contains this style
    start_services_idx = content.rfind("<div", 0, start_services_idx)
    
    if start_services_idx == -1:
        print("Could not find start of services div wrapper.")
        exit(1)
        
    # Find end of services div
    # It ends with ePay link closing and two divs.
    epay_idx = content.find("ePay", idx_services_text)
    
    # We need to find the closing div of the wrapper.
    div_count = 0
    box_end = -1
    for i in range(start_services_idx, len(content)):
         if content[i:i+4] == "<div":
             div_count += 1
         elif content[i:i+6] == "</div>":
             div_count -= 1
             if div_count == 0:
                 box_end = i + 6
                 break
    
    if box_end == -1:
         print("Could not find end of services box.")
         exit(1)
         
    services_html = content[start_services_idx:box_end]
    
    # 2. Left Content
    h1_text = "Create documents easily with templates,"
    h1_idx = content.find(h1_text)
    h1_start_idx = content.rfind("<h1", 0, h1_idx)
    
    if h1_start_idx == -1:
        print("Could not find H1.")
        exit(1)

    left_content = content[h1_start_idx:start_services_idx]
    
    # Check for existing flex
    if "display: flex" in content[h1_start_idx-200:h1_start_idx]:
         print("Warning: It seems flex might already be applied. Proceeding to overwrite/re-wrap.")

    # 3. Create New Layout
    services_html_clean = services_html.replace("margin-top: 40px;", "margin-top: 0;")
    
    new_layout = f"""
    <div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 40px; margin-top: 2rem;">
       <!-- Left Column: 60% width -->
       <div style="flex: 1 1 600px; min-width: 300px; max-width: 900px;">
          {left_content}
       </div>
       
       <!-- Right Column: 40% width -->
       <div style="flex: 1 1 350px; min-width: 300px; max-width: 500px;">
          {services_html_clean}
       </div>
    </div>
    """
    
    final_content = content[:h1_start_idx] + new_layout + content[box_end:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)

    print("Successfully applied 2-column layout to index.html")

except Exception as e:
    print(f"Error: {e}")
