import os

file_path = r"c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates\index.html"

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Inject Style Block for Responsiveness
    # We want to add this before </head> or at the top of <body> if head is messy.
    # Finding </head> is safest.
    
    css_styles = """
    <style>
    /* Hero Section Responsive Layout */
    .hero-flex-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap; 
        align-items: flex-start;
        justify-content: space-between;
        gap: 40px;
        margin-top: 2rem;
    }
    
    .hero-left-col {
        flex: 1 1 600px; /* Grow, Shrink, Basis */
        min-width: 300px;
        max-width: 900px;
    }
    
    .hero-right-col {
        flex: 1 1 350px;
        min-width: 300px;
        max-width: 500px;
    }
    
    /* Services Card Interactions */
    .service-card {
        background: white; 
        padding: 12px; 
        border-radius: 8px; 
        border: 1px solid #e5e7eb; 
        text-decoration: none; 
        display: flex; 
        align-items: center; 
        transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
    }
    .service-card:hover {
        background-color: #f9fafb;
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }

    /* Mobile Adjustments */
    @media (max-width: 991px) {
        .hero-flex-container {
            flex-direction: column;
            gap: 2rem;
        }
        
        .hero-left-col {
            flex: 1 1 100%;
            width: 100%;
            max-width: 100%;
        }
        
        .hero-right-col {
            flex: 1 1 100%;
            width: 100%;
            max-width: 100%;
        }
    }
    </style>
    """
    
    if "</head>" in content:
        content = content.replace("</head>", css_styles + "\n</head>")
        print("Injected CSS into head.")
    else:
        # Fallback
        content = css_styles + content
        print("Injected CSS at top of file.")

    # 2. Replace Inline Styles with Classes
    # We constructed the string in fix_hero_final.py, so we know what to look for.
    # Note: Whitespace/Newlines in 'content' might differ from f-string source.
    
    # We will use regex or careful string replacement.
    # The container:
    old_container_style = 'style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 40px; margin-top: 2rem;"'
    new_container_class = 'class="hero-flex-container"'
    
    # Left Col
    old_left_style = 'style="flex: 1 1 600px; min-width: 300px; max-width: 900px;"'
    new_left_class = 'class="hero-left-col"'
    
    # Right Col
    old_right_style = 'style="flex: 1 1 350px; min-width: 300px; max-width: 500px;"'
    new_right_class = 'class="hero-right-col"'
    
    # Service Cards (inline style to class)
    # They have: style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; text-decoration: none; display: flex; align-items: center; transition: background-color 0.2s;"
    # This is a long string.
    # We can search for the START of it.
    old_card_style_start = 'style="background: white; padding: 12px;'
    # We want to replace the whole style attribute with class="service-card"
    
    if old_container_style in content:
        content = content.replace(old_container_style, new_container_class)
        print("Replaced container style.")
    else:
        print("Could not find container inline style. Might be whitespace mismatch.")
        
    if old_left_style in content:
        content = content.replace(old_left_style, new_left_class)
        print("Replaced left col style.")
        
    if old_right_style in content:
        content = content.replace(old_right_style, new_right_class)
        print("Replaced right col style.")

    # Replace service cards style
    # Regex might be safer
    import re
    # Match style="..." that contains "background: white; padding: 12px; border-radius: 8px"
    # Note: re.sub is good.
    
    # Pattern: style="[^"]*background: white; padding: 12px;[^"]*"
    # But be careful not to match too much.
    pattern = r'style="background: white; padding: 12px;[^"]*"'
    
    # Count occurrences
    matches = re.findall(pattern, content)
    print(f"Found {len(matches)} service cards to update.")
    
    if len(matches) > 0:
        content = re.sub(pattern, 'class="service-card"', content)
        print("Updated service cards to use CSS class.")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content if 'final_content' in locals() else content)

    print("Successfully applied responsive CSS classes.")

except Exception as e:
    print(f"Error: {e}")
