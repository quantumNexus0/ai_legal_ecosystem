
from fastapi import APIRouter, HTTPException
import os
from typing import List, Dict
from bs4 import BeautifulSoup
import re

router = APIRouter()

# Path to the templates directory (relative to this file)
# CORRECT PATH: aiLegalEcosystem/legalTemplate/legalforms/t_forms
TEMPLATE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../legalTemplate/legalforms/t_forms"))

@router.get("/templates", response_model=List[Dict[str, str]])
async def list_templates():
    """List all available templates from t_forms"""
    templates = []
    
    if not os.path.exists(TEMPLATE_DIR):
        print(f"Warning: Template directory not found at {TEMPLATE_DIR}")
        return []

    # Files are directly in t_forms
    try:
        files = os.listdir(TEMPLATE_DIR)
        for file in files:
            if file.endswith(".html"):
                # Since all are in one folder, we'll categorize them as 'General' or infer from name
                name = file.replace(".html", "").replace("-", " ").title()
                
                templates.append({
                    "id": file.replace(".html", ""),
                    "name": name,
                    "category": "General", # or maybe infer category later
                    "filename": file,
                    "path": file # directly under TEMPLATE_DIR
                })
    except Exception as e:
        print(f"Error listing templates: {e}")
        return []
        
    return templates

def clean_html_content(raw_html: str) -> str:
    """
    Parses the raw LegalZoom HTML to extract just the document text.
    Converts custom tags like <field-source> into [Placeholders].
    """
    try:
        soup = BeautifulSoup(raw_html, 'html.parser')
        
        # 1. Target the main content area usually found in legalzoom templates
        # They often use .sample-form, .info-form, or just the main content
        content_div = soup.find('div', class_='sample-form') or \
                      soup.find('div', class_='form-fill-container') or \
                      soup.find('main') or \
                      soup.find('body')
        
        if not content_div:
            return "Error: Could not parse document structure."

        # 2. Process custom tags BEFORE extracting text
        
        # Handle <field-source label="..."> -> [Label]
        for tag in content_div.find_all('field-source'):
            label = tag.get('label') or tag.get('title') or tag.get('fid') or "Field"
            if label == "N/A":
                 # Try to find a better label if available, or just use the FID
                 label = tag.get('fid') or "Input"
            
            # Replace tag with placeholder text
            tag.replace_with(f" **[{label}]** ")

        # Handle <section-dep> (Conditional sections) - Just keep the content for now
        # stripping the tags but keeping inner text
        for tag in content_div.find_all('section-dep'):
            tag.unwrap()

        # 3. Clean up the text
        # Get text, preserving some structure
        text = content_div.get_text(separator="\n\n")
        
        # Remove excessive newlines
        text = re.sub(r'\n\s*\n', '\n\n', text)
        
        # Remove known "garbage" lines from web scraping
        clean_lines = []
        for line in text.splitlines():
            line = line.strip()
            # Skip empty lines or navigational text
            if not line or line.lower() in ["skip to main content", "preview document"]:
                continue
            clean_lines.append(line)
            
        return "\n".join(clean_lines)

    except Exception as e:
        print(f"Error cleaning HTML: {e}")
        return f"Error processing template: {str(e)}"

@router.get("/templates/{filename}")
async def get_template_content(filename: str):
    """Get the CLEANED and PARSED content of a template"""
    file_path = os.path.join(TEMPLATE_DIR, filename)

    print(f"DEBUG: Attempting to open file at: {file_path}") 

    if not os.path.exists(file_path):
        print(f"DEBUG: File not found at {file_path}")
        raise HTTPException(status_code=404, detail=f"Template not found at {file_path}")
        
    try:
        # Try UTF-8 first
        with open(file_path, "r", encoding="utf-8") as f:
            raw_content = f.read()
            clean_text = clean_html_content(raw_content)
            return {"content": clean_text}
    except UnicodeDecodeError:
        # Fallback to Latin-1/Windows-1252
        print(f"DEBUG: UTF-8 failed, trying latin-1 for {file_path}")
        try:
             with open(file_path, "r", encoding="latin-1") as f:
                raw_content = f.read()
                clean_text = clean_html_content(raw_content)
                return {"content": clean_text}
        except Exception as e:
             raise HTTPException(status_code=500, detail=f"Encoding error: {str(e)}")
    except Exception as e:
        print(f"DEBUG: Generic error {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
