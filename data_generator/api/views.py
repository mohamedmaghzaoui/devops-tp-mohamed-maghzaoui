# views.py
from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import render

from django.conf import settings
import json
from django.views.decorators.csrf import csrf_exempt
#gemeni ai api
import google.generativeai as genai
# open ai ai api
# import openai
# from openai import OpenAI
# client = OpenAI(api_key=settings.OPENAI_API_KEY)
# Home view
def home(request):
    return JsonResponse({"message": "Welcome to the Data Generator API!"})

# JSON data generation view
@csrf_exempt
def generate_json_data(request):
    if request.method == "POST":
        try:
            # Parse the JSON body of the request
            data = json.loads(request.body)
            
            # Extract the 'prompt' field
            prompt = data.get("prompt")
            
            if not prompt:
                return HttpResponseBadRequest("No prompt provided")
            # gemini
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)
            # open ai
#             response = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "system", "content": "You are a helpful assistant."},
#         {
#             "role": "user",
#             "content": prompt
#         }
#     ]
# )
            
            
            
            

            # Extract the generated text from the OpenAI response
            generated_text = response.text
            

            # return a JSON response
            try:
                generated_data = json.loads(generated_text)
                return JsonResponse(generated_data)
            except json.JSONDecodeError:
                return HttpResponseBadRequest(generated_data)

        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON format")
    else:
        return HttpResponseBadRequest("Invalid request method")





def health_check(request):
    return JsonResponse({
        "status": "ok"
    })