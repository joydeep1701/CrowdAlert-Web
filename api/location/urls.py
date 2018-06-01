from django.urls import path, include
from api.location import views

urlpatterns = [
    path('places_autocomplete',views.places_autocomplete,
        name='places autocomplete')
]