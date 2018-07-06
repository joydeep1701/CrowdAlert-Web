from django.urls import path, include
from api.users import views

urlpatterns = [
    path('user', views.UserView.as_view(), name='User Data'),
]