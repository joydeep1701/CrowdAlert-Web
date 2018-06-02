from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest

db = settings.FIREBASE.database()

# Create your views here.
def home(request):    
    return JsonResponse({'status':'OK'})

def get_event_by_id(request):
    if request.method == 'GET':
        query = request.GET.get('id','')
        if query == '':
            return HttpResponseBadRequest("Bad request")
        data = db.child('incidents').child(query).get().val()
        return JsonResponse(data, safe=False)