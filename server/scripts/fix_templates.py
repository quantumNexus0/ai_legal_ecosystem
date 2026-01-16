import os

file_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Remove the incorrectly appended content at the end
    # The snippet we added starts with <div style="background-color: #f3f4f6;
    bad_start = '<div style="background-color: #f3f4f6;'
    
    # We want to remove the specific block we added if it appears AFTER </html>
    # But simpler: let's just strip it out entirely from the whole file first to reset
    if bad_start in content:
        # Remove all instances of our injection to be clean
        # We need to construct the full string to remove it effectively or just use string manipulation
        # Since we know the Exact start, we can split and rejoin carefully.
        
        # Heuristic: Remove the injected block. 
        # It ends with "</div>\n</div>" approximately.
        # Let's try to locate the start and end indices.
        
        start_idx = content.find(bad_start)
        while start_idx != -1:
            # Find the end of this div block. It's tricky with nested divs.
            # But we know our injected string length or content.
            # Let's just use the known injected string from patch_templates.py
            
            # Reconstruct the string we injected
            html_to_inject = """
<div style="background-color: #f3f4f6; padding: 40px 20px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 1280px; margin: 0 auto; text-align: center;">
    <h2 style="font-size: 2rem; font-weight: 800; color: #111827; margin-bottom: 10px;">e-Courts Services</h2>
    <p style="color: #6b7280; font-size: 1.125rem; margin-bottom: 40px;">Quick access to official Indian Judiciary services</p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
      <a href="https://SERVICES.ecourts.gov.in/highcourt" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 24px; margin-right: 12px;">⚖️</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">High Court Services</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Access to Services of e-Courts: Cause lists, Case Status, Orders/Judgments.</p>
      </a>

      <a href="https://njdg.ecourts.gov.in/hcnjdg_public/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">📊</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">High Court NJDG</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Monitoring tool to identify, manage and reduce pendency of cases.</p>
      </a>

      <a href="https://SERVICES.ecourts.gov.in/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">🏛️</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">District Court Services</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Access Cause lists, Case Status, Orders/Judgments & NJDG.</p>
      </a>

      <a href="https://efiling.ecourts.gov.in/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">💻</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">e-Filing</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Electronic filing of legal papers.</p>
      </a>
      
      <a href="https://vcourts.gov.in/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">📹</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">Virtual Courts</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Adjudication of cases online eliminating physical presence.</p>
      </a>

      <a href="https://pay.ecourts.gov.in/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">💳</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">ePay</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Pay court fees electronically.</p>
      </a>
    </div>
    
    <div style="margin-top: 30px; font-size: 0.75rem; color: #9ca3af;">
       LINKS REDIRECT TO OFFICIAL GOVERNMENT PORTALS (ECOURTS.GOV.IN)
    </div>
  </div>
</div>
"""
            # We strip whitespace to match strictly
            clean_inject = html_to_inject.strip()
            # Replace logic:
            # 1. Split content by the injection (approximate match orexact)
            # Since formatting might vary (newlines), let's try strict replace first.
            
            if clean_inject in content:
                content = content.replace(clean_inject, "")
            else:
                # If strict match fails due to newlines, we might need a more aggressive approach
                # Or just manually slice if we are sure it's at the end
                pass
            
            # Recheck loop
            start_idx = content.find(bad_start)
            if start_idx != -1:
                # Force break to calculate manually if replace failed
                # Taking a slice from start_idx to end of file is risky if we have </html>
                # But we saw it was appended AFTER </html>.
                # Let's try to just truncate if it's after </html>
                html_close_idx = content.rfind("</html>")
                if html_close_idx != -1 and start_idx > html_close_idx:
                    content = content[:html_close_idx+7] # Keep </html>
                    break
                else:
                    # It's inside? just replace it with empty
                    # We might have issues matching exactly so let's rely on finding </body> and cleaning up.
                    break 

    # 2. Insert Correctly BEFORE </body>
    # We want to put it right before the scripts at the end of body, or just before </body>
    
    # Re-define html_to_inject used above
    html_to_inject = """
<div style="background-color: #f3f4f6; padding: 40px 20px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 1280px; margin: 0 auto; text-align: center;">
    <h2 style="font-size: 2rem; font-weight: 800; color: #111827; margin-bottom: 10px;">e-Courts Services</h2>
    <p style="color: #6b7280; font-size: 1.125rem; margin-bottom: 40px;">Quick access to official Indian Judiciary services</p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
      <a href="https://SERVICES.ecourts.gov.in/highcourt" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 24px; margin-right: 12px;">⚖️</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">High Court Services</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Access to Services of e-Courts: Cause lists, Case Status, Orders/Judgments.</p>
      </a>

      <a href="https://njdg.ecourts.gov.in/hcnjdg_public/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">📊</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">High Court NJDG</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Monitoring tool to identify, manage and reduce pendency of cases.</p>
      </a>

      <a href="https://SERVICES.ecourts.gov.in/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">🏛️</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">District Court Services</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Access Cause lists, Case Status, Orders/Judgments & NJDG.</p>
      </a>

      <a href="https://efiling.ecourts.gov.in/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">💻</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">e-Filing</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Electronic filing of legal papers.</p>
      </a>
      
      <a href="https://vcourts.gov.in/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">📹</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">Virtual Courts</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Adjudication of cases online eliminating physical presence.</p>
      </a>

      <a href="https://pay.ecourts.gov.in/" target="_blank" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; text-decoration: none; text-align: left; transition: box-shadow 0.2s; display: block;" onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
           <span style="font-size: 24px; margin-right: 12px;">💳</span>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">ePay</h3>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Pay court fees electronically.</p>
      </a>
    </div>
    
    <div style="margin-top: 30px; font-size: 0.75rem; color: #9ca3af;">
       LINKS REDIRECT TO OFFICIAL GOVERNMENT PORTALS (ECOURTS.GOV.IN)
    </div>
  </div>
</div>
"""
    
    # Locate </body>
    idx = content.rfind('</body>')
    if idx != -1:
        new_content = content[:idx] + "\n" + html_to_inject + "\n</body>" + content[idx+7:]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully fixed and injected content into index.html")
    else:
        print("Could not find closing body tag in index.html, skipping injection.")

except Exception as e:
    print(f"Error: {e}")
