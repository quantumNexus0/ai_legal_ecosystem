
import os

FILE_PATH = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

def remove_old_nav():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    skip = False
    
    # We are looking for the OLD nav block to remove.
    # It likely starts with <div id="nyaya-assist-custom-nav" (without container?)
    # And contains "Legal Services Platform"
    
    # Strategy: Read lines. If we hit a start tag for our nav, we check if it's the OLD one.
    # If it's the old one, we skip lines until end of that div.
    
    # Note: HTML might be minified or multi-line. 
    # Let's try to remove the whole block by finding the specific unique string.
    
    content = "".join(lines)
    
    # Identify the Old Block by its unique text label
    if "Legal Services Platform" in content:
        print("Found the old navigation bar ('Legal Services Platform'). Removing...")
        
        # The old block started with <div id="nyaya-assist-custom-nav" ...
        # It did NOT have the container id around it maybe? Or maybe it did.
        # But the NEW one has "Platform" (short).
        
        # Let's use string splitting to isolate it.
        # We look for the div that CONTAINS "Legal Services Platform"
        
        # This is the old HTML structure roughly:
        # <div id="nyaya-assist-custom-nav" style="..."> ... Legal Services Platform ... </div>
        
        # We will iterate through occurrences of 'id="nyaya-assist-custom-nav"'
        # And check if the following content contains "Legal Services Platform" before the matching </div>
        
        # SIMPLER APPROACH:
        # The old block is likely stuck right after <body> or slightly further down.
        # Let's search for the exact string "Legal Services Platform" and find the enclosing div.
        
        start_marker = '<div id="nyaya-assist-custom-nav"'
        end_marker = '</div>' 
        
        # We'll split by the start marker to find chunks
        chunks = content.split(start_marker)
        
        # chunks[0] is everything before the first nav
        # chunks[1] is the body of the first nav + rest of file
        # etc.
        
        final_parts = [chunks[0]] # Keep the pre-content
        
        for chunk in chunks[1:]:
            # Check if this chunk belongs to the OLD nav
            # The old nav has "Legal Services Platform" inside it (before the next big div close?)
            # Actually, let's just check the content immediately following.
            
            if "Legal Services Platform" in chunk[:5000]: # Check first 5000 chars of chunk
                print(" -> Dropping a chunk containing 'Legal Services Platform'")
                # We need to find where this div ends.
                # Assuming the div ends with </div> and then maybe some newline.
                # The old script had `</div>\n</div>`? No, the old script was just ONE div.
                # <div ...> ... </div>
                
                # Let's try to find the first closing </div> and strip everything up to it.
                # BUT, wait, nested divs?
                # The old HTML had:
                # <div id="nyaya-assist-custom-nav" ...>
                #   <div> ... </div>
                #   <div> ... </div> 
                # </div>
                # So simply finding the first </div> is risky.
                
                # However, the old script ended with:
                # <div style="width: 100px;"></div> <!-- Spacer -->
                # </div>
                
                # Let's look for the spacer width: 100px;"></div>
                
                parts = chunk.split('width: 100px;"></div>')
                if len(parts) > 1:
                    # parts[0] is the nav body. parts[1] is the rest of the file (starting with </div> usually)
                    # We want to discard parts[0] and the closing div that follows.
                    
                    rest = parts[1]
                    # The content was `width: 100px;"></div> \n </div>`
                    # So parts[1] starts with ` \n </div>` probably.
                    
                    # Let's find the First closing bracket of the main div
                    close_index = rest.find('</div>')
                    if close_index != -1:
                        preserved_content = rest[close_index+6:] # Skip </div>
                        final_parts.append(preserved_content)
                    else:
                        print("Error: Could not find closing div for old nav.")
                        final_parts.append(start_marker + chunk) # restoring to be safe
                else:
                    print("Could not find spacer end marker. Restoring.")
                    final_parts.append(start_marker + chunk)

            elif "Platform" in chunk[:5000] and "Legal Services" not in chunk[:5000]:
                print(" -> Keeping the NEW nav ('Platform' only).")
                final_parts.append(start_marker + chunk)
            else:
                # Some other match? Or maybe the text is different.
                print(" -> Unknown block. Keeping.")
                final_parts.append(start_marker + chunk)
        
        new_content = "".join(final_parts)
        
        if len(new_content) < len(content):
            with open(FILE_PATH, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Successfully removed the old navigation bar.")
        else:
            print("No modification made. Check logic.")
            
    else:
        print("Could not find 'Legal Services Platform' in the file. Maybe already gone?")

if __name__ == "__main__":
    remove_old_nav()
