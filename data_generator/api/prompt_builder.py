import json

def build_prompt(schema: dict, count: int):

    def clean_schema(field):
        return {
            "name": field.get("name"),
            "type": field.get("type"),
            "format": field.get("format"),
            "regex": field.get("regex"),
            "children": [
                clean_schema(c) for c in field.get("children", [])
            ] if field.get("children") else []
        }

    structured_schema = [clean_schema(f) for f in schema]

    root_name = structured_schema[0]["name"]  

    example_output = [
        {
            root_name: {
                "email": "user01@example.com",
                "password": "pass_01"
            }
        }
    ]

    prompt = f"""
YOU ARE A STRICT JSON DATA GENERATOR ENGINE.

========================
CRITICAL RULES
========================

- Output MUST be a valid JSON ARRAY ONLY
- NO markdown
- NO explanation
- NO extra text
- NO schema in output

========================
🔥 ROOT FIELD RULE (VERY IMPORTANT)
========================

- The FIRST field in the schema is the ROOT OBJECT KEY
- ROOT FIELD IS ONLY A CONTAINER
- DO NOT generate a value for the root field itself
- DO NOT duplicate root field inside its children

Example:

Schema:
username -> email, password

Correct output:
[
  {{
    "username": {{
      "email": "...",
      "password": "..."
    }}
  }}
]

Wrong output:
[
  {{
    "username": {{
      "username": "...",   ❌ NEVER
      "email": "...",
      "password": "..."
    }}
  }}
]

========================
STRUCTURE RULE
========================

- If node has children → object ONLY (NO value)
- If node has NO children → generate value
- Recursively apply this rule

========================
INPUT SCHEMA
========================
{json.dumps(structured_schema, indent=2)}

========================
EXAMPLE OUTPUT
========================
{json.dumps(example_output, indent=2)}

========================
TASK
========================

Generate exactly {count} JSON objects.

Return ONLY valid JSON array.

START NOW.
"""

    return prompt