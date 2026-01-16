import os

file_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

# The 4 items we previously injected (to be replaced)
old_grid_content = """<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <a href="https://SERVICES.ecourts.gov.in/highcourt" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">⚖️</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">High Court Services</span>
      </a>
      <a href="https://njdg.ecourts.gov.in/hcnjdg_public/" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">📊</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">High Court NJDG</span>
      </a>
      <a href="https://SERVICES.ecourts.gov.in/" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">🏛️</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">District Court Services</span>
      </a>
      <a href="https://efiling.ecourts.gov.in/" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">💻</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">e-Filing</span>
      </a>
  </div>"""

# The new 6 items
new_grid_content = """<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <a href="https://SERVICES.ecourts.gov.in/highcourt" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">⚖️</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">High Court Services</span>
      </a>
      <a href="https://njdg.ecourts.gov.in/hcnjdg_public/" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">📊</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">High Court NJDG</span>
      </a>
      <a href="https://SERVICES.ecourts.gov.in/" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">🏛️</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">District Court Services</span>
      </a>
      <a href="https://efiling.ecourts.gov.in/" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">💻</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">e-Filing</span>
      </a>
      <a href="https://vcourts.gov.in/" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">📹</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">Virtual Courts</span>
      </a>
      <a href="https://pay.ecourts.gov.in/" target="_blank" style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;">
          <span style="font-size: 20px; margin-right: 12px;">💳</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">ePay</span>
      </a>
  </div>"""

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # We simply replace the old grid block with the new one
    # We need to match exactly what was written in patch_hero.py
    # White space might be tricky so let's try to match by key parts if exact match fails
    
    if old_grid_content in content:
        new_content = content.replace(old_grid_content, new_grid_content)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated index.html with all 6 services.")
    else:
        # Fallback: maybe newlines are different.
        print("Could not find exact match for old grid, trying looser match...")
        # Just check if we can identify the start and end of that grid div
        start_marker = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">'
        if start_marker in content:
            # We assume the user hasn't modified it manually between calls.
            # The block ends with </div>.
            # Let's locate the block that starts with start_marker
            start_idx = content.find(start_marker)
            # Find the closing div for this block. Since it has nested <a> tags but no nested divs inside them, 
            # we can look for the closing </div> that matches this indentation level? 
            # Actually, the old content works because it was a specific string.
            # If `old_grid_content` string match failed, it's likely due to implicit newline handling difference on Windows vs Python string.
            
            # Let's just try to replace the inner content if we can navigate the DOM in text.
            # Or assume it was written exactly as the python script dictated.
            pass
        
        print("Failed to replace. Please check the file content.")

except Exception as e:
    print(f"Error: {e}")
