from django.urls import path, include
from api.images import views
from rest_framework import routers

router = routers.SimpleRouter()

urlpatterns = [
    path('upload', views.ImagesView.as_view(), name='Image Upload'),
    path('getimageurl', views.get_image_url, name='Image URL')
]