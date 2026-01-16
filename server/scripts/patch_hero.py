import os

file_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

# This HTML mimics the "compact" style but using inline CSS for the static page
hero_injection = """
<div style="margin-top: 40px; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); padding: 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
    <h3 style="font-size: 1.125rem; font-weight: 700; color: #111827; display: flex; align-items: center;">
      <span style="margin-right: 8px;">⚖️</span> Official Judiciary Services
    </h3>
    <span style="font-size: 0.75rem; font-weight: 600; padding: 4px 8px; background-color: #dcfce7; color: #15803d; border-radius: 9999px;">Live Access</span>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
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
  </div>
</div>
"""

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Heuristic to find the Hero section. 
    # Usually contains "Attorney-Drafted Templates" (title) or "Create documents easily" (description)
    # We want to insert this below the main hero text but before the search/content.
    
    target_phrase = "Create documents easily with our 190+ attorney-drafted templates."
    
    # We need to find where this text visually ends in the DOM structure to append our block.
    # Or we can look for the closing div of the hero container.
    # Since we can't inspect the DOM, let's try to append it after the main H1 or intro paragraph.
    
    if target_phrase in content:
        # Crude approach: Find the phrase, find the next closing </div> or </p> and append there
        # Let's try to look for the specific place locally.
        # Based on file viewing (though truncated), it seems to be standard bootstrap or similar.
        
        # We will try to inject it after the main banner text.
        # If we can't find exact location easily, we might prepend to the `container` div if we can identify it.
        pass
    
    # As a fallback/better guess for this specific template file which I viewed partially:
    # It has a <div class="container"> usually. 
    # Let's try to inject it right after the opening <body> -> <header> ... or just at the top of the main container.
    
    # For now, let's inject it into the first main textual container we find.
    # We will search for "Attorney-Drafted Templates</h1>" (approx) and inject after.
    
    search_marker = "Attorney-Drafted Templates" 
    # This assumes it's in an H1 or similar.
    
    # Actually, simpler: Insert after the Navbar, before the main content.
    # Often id="page-content" or class="main".
    
    # Let's try to find "Attorney-Drafted Templates" again and verify context.
    idx = content.find(search_marker)
    if idx != -1:
        # Find the next closing Div after this marker, assuming it is inside a hero div
        # This is risky.
        
        # Alternative: The user said "Hero section".
        # Let's just put it strictly after the first <h1>...</h1> block found on the page.
        h1_end = content.find("</h1>")
        if h1_end != -1:
             # Look for the closing of the parent container of H1?
             # Let's just insert it immediately after the H1's parent text block.
             # e.g. after the p tag following h1.
             
             p_end = content.find("</p>", h1_end)
             if p_end != -1:
                 new_content = content[:p_end+4] + hero_injection + content[p_end+4:]
                 with open(file_path, 'w', encoding='utf-8') as f:
                     f.write(new_content)
                 print("Successfully injected hero content into index.html")
             else:
                 print("Found H1 but no following paragraph to insert after.")
        else:
             print("Could not find H1 tag to locate hero section.")
    else:
        print("Could not find 'Attorney-Drafted Templates' marker.")

except Exception as e:
    print(f"Error: {e}")
