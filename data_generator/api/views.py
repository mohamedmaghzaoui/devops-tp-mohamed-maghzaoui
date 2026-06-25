import json

from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

import google.generativeai as genai

from .models import GeneratedJson
from .serializers import GeneratedJsonSerializer
from .prompt_builder import build_prompt


# GEMINI CONFIG 
genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("models/gemini-3.1-flash-lite")
for m in genai.list_models():
    print(m.name)

# health endpoint
@api_view(["GET"])
def health(request):
    return Response({"status": "ok"})


# list
@api_view(["GET"])
def list_generations(request):
    data = GeneratedJson.objects.order_by("-created_at")
    serializer = GeneratedJsonSerializer(data, many=True)
    return Response(serializer.data)


# generate new json data
@api_view(["POST"])
def generate(request):

    schema = request.data.get("schema", [])
    count = request.data.get("count", 10)

    if not schema:
        return Response(
            {"error": "schema required"},
            status=400
        )

    prompt = build_prompt(schema, count)

    try:
        response = model.generate_content(
            f"""
Return ONLY valid JSON.
No markdown.
No explanation.
No text.

{prompt}
"""
        )

        raw = response.text.strip()

        # clean Gemini 
        raw = raw.replace("```json", "").replace("```", "").strip()

        result = json.loads(raw)

        saved = GeneratedJson.objects.create(
    prompt=prompt,
    generated_data=result   
)

        return Response(
            GeneratedJsonSerializer(saved).data
        )

    except json.JSONDecodeError:
        return Response(
            {
                "error": "Invalid JSON from Gemini",
                "raw": raw
            },
            status=400
        )

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=500
        )