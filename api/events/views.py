from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from api.location.gps import distance
from rest_framework.views import APIView
from rest_framework import permissions
from api.firebase_auth.authentication import TokenAuthentication
from api.firebase_auth.permissions import FirebasePermissions
from api.spam.classifier import classify_text
from api.spam.views import get_spam_report_data

import json
import time

db = settings.FIREBASE.database()
    
class EventView(APIView):
    """API view class for events
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (FirebasePermissions,)
    
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
        for key in data['reportedBy']:
            if data['reportedBy'][key]['anonymous']:
                data['reportedBy'][key] = {
                    'displayName': "Anonymous",
                    'photoURL': 'https://crowdalert.herokuapp.com/static/images/meerkat.svg',
                }
            else:
                user_id = data['reportedBy'][key]['userId']
                udata = db.child('users/' + user_id).get().val()
                data['reportedBy'][key] = {
                    'displayName': udata['displayName'],
                    'photoURL': udata['photoURL'],
                }
        data['spam'] = get_spam_report_data(query)
        return JsonResponse(data, safe=False)

    def post(self, request):    
        """Post event to firebase db. 

        Potential required features:
            Custom validation
            Location validation
            Spam classification
        """
        eventData = json.loads(request.body.decode()).get('eventData','')
        if eventData == '':
            return HttpResponseBadRequest("Bad request")
        decoded_json = json.loads(eventData)
        uid = str(request.user)

        latitude = decoded_json['location']['coords']['latitude']
        longitude = decoded_json['location']['coords']['longitude']

        incident_data = {
            "category": decoded_json['category'],
            "datetime": int(time.time()*1000),
            "description": decoded_json['description'],
            "local_assistance": decoded_json['local_assistance'],
            "location": {
                "coords": {
                    "latitude": latitude,
                    "longitude": longitude,
                },
            },
            "public": {
                "share": decoded_json['public']['share'],
                "view":  decoded_json['public']['view'],
            },
            "reportedBy": {
                "original": {
                    "userId": uid,
                    "anonymous": decoded_json['anonymous'],
                },
            },
            "title": decoded_json['title']
        }

        data = db.child('incidents').push(incident_data)

        key = data['name']
        db.child('incidentReports/' + uid).push({
            "incidentId": key,
        })
        classify_text(decoded_json['description'], key)
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
            # Find events between the radius
            for incident in incidents.each():                     
                event = dict(incident.val())
                temp = {}
                temp['key'] = incident.key()
                temp['lat'] = event['location']['coords']['latitude']
                temp['long'] = event['location']['coords']['longitude']
                temp['category'] = event['category']
                temp['title'] = event['title']
                temp['datetime'] = event['datetime']
                tmplat = float(event['location']['coords']['latitude'])
                tmplng = float(event['location']['coords']['longitude'])                
                dist = distance(tmplat, tmplng, lat, lng)
                if dist < thresold:
                    data.append(temp)
            
            # Cluster the events
            clusterThresold = float(request.GET.get('min',0))

            if clusterThresold:
                modData = []

                for root in data:
                    if not root.get('isClustered', False):
                        for child in data:
                            if child['key'] == root['key']:
                                continue
                            if not child.get('isClustered',False):
                                tempDist = distance(root['lat'], root['long'],
                                                    child['lat'], child['long'])
                                if tempDist < clusterThresold:
                                    root['isClustered'] = True
                                    root['lat'] = (root['lat'] + child['lat'])/2
                                    root['long'] = (root['long'] + child['long'])/2

                                    child['isClustered'] = True
                        modData.append(root)
                return JsonResponse((modData), safe=False)
            return JsonResponse(data, safe=False)
        return HttpResponseBadRequest("Bad request")

# Just to make sure we are hitting the right module
def home(request):    
    return JsonResponse({'status':'OK'})
