from django.urls import path, include
from api.location import views

urlpatterns = [
    path('places_autocomplete',views.places_autocomplete,
        name='places autocomplete'),
    path('reverse_geocode', views.reverse_geocode, name='reverse geocode'),
    path('get_location', views.get_user_location, name='get location using ip'),
]