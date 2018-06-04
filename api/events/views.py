from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from api.location.gps import distance
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
    return HttpResponseBadRequest("Bad request")

def get_events_by_location(request):
    if request.method == 'GET':
        lat = float(request.GET.get('lat', ''))
        lng = float(request.GET.get('long', ''))
        thresold = float(request.GET.get('dist', ''))
        if lat == '' or lng == '' or thresold == '':
            return HttpResponseBadRequest("Bad request")
        
        incidents = db.child('incidents').get()
        data = []
        for incident in incidents.each():                     
            event = dict(incident.val())
            temp = {}
            temp['key'] = incident.key()
            temp['lat'] = event['location']['coords']['latitude']
            temp['long'] = event['location']['coords']['longitude']

            if distance(float(event['location']['coords']['latitude']),
             float(event['location']['coords']['longitude']), lat, lng) < thresold:
                data.append(temp)

        return JsonResponse(data, safe=False)
    return HttpResponseBadRequest("Bad request")