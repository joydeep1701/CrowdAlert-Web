from django.conf import settings
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
import json
from api.firebase_auth.authentication import TokenAuthentication

db = settings.FIREBASE.database()

class UserView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self, requst):
        return JsonResponse({}, safe=False)

    def post(self, request):
        try:
            userData = json.loads(json.loads(request.body.decode()).get('userData'))            
        except:
            return HttpResponseBadRequest("Bad request")

        if userData == '':
            return HttpResponseBadRequest("Bad request")
        uid = str(request.user)
        if userData.get('displayName', False):
            db.child('users/'+uid+'/displayName').set(
                userData.get('displayName',' ')
            )
        print(db.child('users/'+uid+'/displayName').get().val())
        return JsonResponse({"status": "ok"}, safe=False)