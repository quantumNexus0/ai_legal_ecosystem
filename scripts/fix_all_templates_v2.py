import os

target_dir = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\t"

old_link = 'href="/template-portal/templates/index.html"'
new_link = 'href="../index.html"'

full_old_script = """    // --- 2. Mobile Preview Button Fix (Show Template) ---
    // User wants the "Preview" button on mobile to reveal the document template.
    // The template is often hidden behind 'hidden lg:flex' classes on mobile.
    
    const isMobile = window.innerWidth < 1024; // lg breakpoint definition roughly
    
    if (isMobile) {
        // Find the "Preview" button
        const buttons = Array.from(document.querySelectorAll('button'));
        const previewBtn = buttons.find(btn => btn.innerText.trim().includes('Preview'));
        
        if (previewBtn) {
            previewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Find the template container. usually #sample-document
                // And its hidden parent.
                const sampleDoc = document.getElementById('sample-document');
                if (sampleDoc) {
                    // Traverse up to find the hidden wrapper (likely .hidden.lg:flex)
                    let wrapper = sampleDoc.parentElement;
                    while (wrapper && wrapper !== document.body) {
                        if (wrapper.classList.contains('hidden') && wrapper.classList.contains('lg:flex')) {
                            // Reveal it
                            wrapper.classList.remove('hidden');
                            wrapper.classList.add('flex'); // Ensure it displays
                            break;
                        }
                        wrapper = wrapper.parentElement;
                    }
                    
                    // Scroll to it
                    sampleDoc.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }
});"""

new_script = """    // --- 2. Mobile Preview Button Fix (Show Template) ---
    // User wants the "Preview" button on mobile to reveal the document template.
    
    // Find the "Preview" button (or "Create Document" if labelled such)
    const buttons = Array.from(document.querySelectorAll('button'));
    const previewBtn = buttons.find(btn => {
        const txt = btn.innerText.trim().toLowerCase();
        return txt.includes('preview') || txt.includes('create document');
    });
        
    if (previewBtn) {
        previewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sampleDoc = document.getElementById('sample-document');
            if (sampleDoc) {
                // Force visibility on parents
                let wrapper = sampleDoc.parentElement;
                while (wrapper && wrapper !== document.body) {
                    const style = window.getComputedStyle(wrapper);
                    if (wrapper.classList.contains('hidden') || style.display === 'none') {
                        wrapper.classList.remove('hidden');
                        if (wrapper.classList.contains('lg:flex')) {
                             wrapper.classList.add('flex');
                        } else {
                             wrapper.style.display = 'block';
                        }
                    }
                    wrapper = wrapper.parentElement;
                }
                
                // Also ensure sampleDoc itself is visible
                sampleDoc.style.display = 'block';
                
                // Scroll to it
                setTimeout(() => {
                    sampleDoc.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    }
});"""

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return
    
    modified = False
    
    if old_link in content:
        content = content.replace(old_link, new_link)
        modified = True
        print(f"Fixed link in {filepath}")
        
    if full_old_script in content:
        content = content.replace(full_old_script, new_script)
        modified = True
        print(f"Updated script in {filepath}")
    else:
        # Check if maybe indentation is different? Or already updated?
        if new_script in content:
            # Already updated
            pass
        elif "Mobile Preview Button Fix" in content:
             print(f"WARNING: Script found but didn't match exact string in {filepath}. Manual check required.")
             # Could fallback to partial replacement if needed
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

for filename in os.listdir(target_dir):
    if filename.endswith(".html"):
        process_file(os.path.join(target_dir, filename))
