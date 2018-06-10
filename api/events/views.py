from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from api.location.gps import distance
from rest_framework.views import APIView
import json
import time

db = settings.FIREBASE.database()

    
class EventsView(APIView):
    """API view class for events
    """
    # authentication_classes = (authentication.FIREBASE_AUTH)
    def get(self,request):        
        query = request.GET.get('id','')
        if query == '':
            return HttpResponseBadRequest("Bad request")
        data = db.child('incidents').child(query).get().val()
        return JsonResponse(data, safe=False)

    def post(self, request):    
        # Do stuff
        eventData = request.POST.get('eventData','')
        if eventData == '':
            return HttpResponseBadRequest("Bad request")
        decoded_json = json.loads(eventData)
        decoded_json['datetime'] = int(time.time()*1000)
        decoded_json['comments'] = ''
        decoded_json['images'] = {}
        decoded_json['upvotes'] = 0
        decoded_json['user_email'] = "digital0signature@gmail.com"
        decoded_json['user_id'] = "digital0signature@gmailcom"
        data = db.child('incidents').push(decoded_json)
        key = data['name']
        return JsonResponse({"eventId":str(key)}) 



# Create your views here.
def home(request):    
    return JsonResponse({'status':'OK'})



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
