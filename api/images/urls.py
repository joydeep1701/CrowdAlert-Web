from django.urls import path, include
from api.images import views
from rest_framework import routers

router = routers.SimpleRouter()

urlpatterns = [
    path('image', views.ImagesView.as_view(), name='Image Upload'),
]