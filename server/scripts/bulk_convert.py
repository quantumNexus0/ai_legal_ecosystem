import csv
import json
import os
import re

# Resolve paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INPUT_DIR = os.path.join(BASE_DIR, "data", "TopJudgement")
OUTPUT_DIR = os.path.join(BASE_DIR, "data", "JudgmentDetails")

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def to_slug(text):
    # Normalize naming like the API does (plus Windows safety)
    # Remove all non-alphanumeric except space, then replace spaces with underscore
    clean = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    slug = clean.lower().strip().replace(" ", "_").replace("__", "_")
    return slug

def generate_skeleton(row, type_name="Case"):
    title = row.get("title", "Unknown Title")
    url = row.get("url", "#")
    citation = row.get("docsource", "Supreme Court of India")
    slug = to_slug(title)
    
    # Generic structured data
    return {
        "id": slug,
        "title": title,
        "citation": citation,
        "court": row.get("docsource", "Supreme Court of India"),
        "date": "Extracted from source", # Dates aren't in separate columns usually
        "facts": [
            f"Detailed facts for this {type_name} are currently being synchronized from official sources.",
            f"Source URL: {url}"
        ],
        "issues": [
            f"The primary issues revolve around the interpretation of {title} in the context of judicial precedents."
        ],
        "analysis_of_law": [
            f"Statutory provisions and legal principles as mentioned in {title}."
        ],
        "precedent_analysis": [
            "Detailed citation analysis is in progress."
        ],
        "courts_reasoning": [
            "The court's internal logic and ratio decidendi are being parsed from the original text.",
            f"Please refer to the source document at {url} for full details."
        ],
        "conclusion": [
            "Decision finalized as per official court records."
        ],
        "full_ratio": f"The full legal ratio for '{title}' is being processed for interactive segmentation. Click the Source URL for an immediate overview."
    }, slug

def process_csv(filename, type_label):
    file_path = os.path.join(INPUT_DIR, filename)
    if not os.path.exists(file_path):
        print(f"Skipping {filename}: File not found.")
        return

    count = 0
    with open(file_path, mode='r', encoding='utf-8') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            data, slug = generate_skeleton(row, type_label)
            output_file = os.path.join(OUTPUT_DIR, f"{slug}.json")
            
            # Don't overwrite if manually enriched
            if not os.path.exists(output_file):
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2)
                count += 1
                
    print(f"Generated {count} {type_label} skeletons in JudgmentDetails.")

if __name__ == "__main__":
    process_csv("top_judgments.csv", "Judgment")
    process_csv("top_sections.csv", "Legal Section")
    print("Done!")
