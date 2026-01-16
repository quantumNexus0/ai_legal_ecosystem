import os

file_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

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

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Simple check if already added
    if "e-Courts Services" in content and "background-color: #f3f4f6" in content:
        print("Government services section already present.")
    else:
        # Find </body>
        split_content = content.rsplit('</body>', 1)
        if len(split_content) == 2:
            new_content = split_content[0] + html_to_inject + "\n</body>" + split_content[1]
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Successfully injected content into index.html")
        else:
            print("Could not find closing body tag in index.html")

except Exception as e:
    print(f"Error: {e}")
