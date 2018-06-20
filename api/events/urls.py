from django.urls import path, re_path, include
from api.events import views
from rest_framework import routers

router = routers.SimpleRouter()

urlpatterns = [
    # API paths
    path('geteventsbylocation', views.MultipleEventsView.as_view(),
        name='get events by a location & thresold'),
    path('incident', views.EventView.as_view(), name='create new event'),
    path('', views.home, name='events home'),
    
]
