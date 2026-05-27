from django.urls import path
from . import views
urlpatterns = [
    path('', views.home, name="home"),
    path('generate-json/', views.generate_json_data, name='generate_json_data'),
    
]

