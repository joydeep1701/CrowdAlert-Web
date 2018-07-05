from rest_framework import authentication
import firebase_admin
from firebase_admin import auth
from rest_framework import exceptions
from django.conf import settings
import os

class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        try:
            token = request.META.get('HTTP_TOKEN', False)
            if not token:
                return None
            user = auth.verify_id_token(token)
        except Exception as e:
            print(e)
            raise exceptions.AuthenticationFailed('Authentication Failed')

        if not user:
            raise exceptions.AuthenticationFailed('The user does not exist')

        return (user, None)