from django.urls import path, include
from api.images import views

urlpatterns = [

    path('upload/', views.upload, name='Image Upload'),
    path('getimageurl', views.get_image_url, name='Image URL')
]