from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from api.location.gps import distance
from rest_framework.views import APIView
import json
import time

db = settings.FIREBASE.database()
    
class EventView(APIView):
    """API view class for events
    """
    # authentication_classes = (authentication.FIREBASE_AUTH)
    def get(self,request):
        """Returns events within a certain radius for a given location
        
        GET request parameters: 
            [REQUIRED]
            id: firebase event id


        Arguments:
            request {[type]} -- [ Contains the django request object]
        
        Returns:
            [HttpResponseBadRequest] -- [If  event id is not given]
            [JsonResponse] -- [Containing the event data]     
        """      
        query = request.GET.get('id','')
        if query == '':
            return HttpResponseBadRequest("Bad request: No Id specified")
        data = db.child('incidents').child(query).get().val()
        return JsonResponse(data, safe=False)

    def post(self, request):    
        """Post event to firebase db. 

        Potential required features:
            Custom validation
            Location validation
            Spam classification
        """

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

class MultipleEventsView(APIView):

    def get(self, request):
        """Returns events within a certain radius for a given location
        
        POST request parameters: 
            [REQUIRED]
            lat: latitude of the location
                
            long: longitude of the location

            dist: maximum radius of the location

        Arguments:
            request {[type]} -- [ Contains the django request object]
        
        Returns:
            [HttpResponseBadRequest] -- [If  any of the required parameters is
                                        not given.]
            [JsonResponse] -- [Containing the event data]     
        """
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

                tmplat = float(event['location']['coords']['latitude'])
                tmplng = float(event['location']['coords']['longitude'])
                # Find 
                dist = distance(tmplat, tmplng, lat, lng)

                if dist < thresold:
                    data.append(temp)

            return JsonResponse(data, safe=False)
        return HttpResponseBadRequest("Bad request")

# Just to make sure we are hitting the right module
def home(request):    
    return JsonResponse({'status':'OK'})
