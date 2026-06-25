from django.urls import path
from .views import generate, list_generations, health

urlpatterns = [
    path("health/", health),
    path("generate/", generate),
    path("generations/", list_generations),
]