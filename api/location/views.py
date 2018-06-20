from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
import reverse_geocoder as rgc
import geocoder as gc
from rest_framework.views import APIView

gmaps = settings.GMAPS

class PlacesView(APIView):
    """ Autocomplete place names by google maps
    
    Arguments:
        APIView {[type]} -- [description]

    GET request parameters: 
        [REQUIRED]
        q: location name
    
    Returns:
        [HttpResponseBadRequest] -- [If  any of the required parameters is
                                        not given.]
        [JsonResponse] -- [Containing the location data]     
    """

    def get(self, request):
        if request.method == 'GET':
            query = request.GET.get('q', '')
            if query == '':
                return HttpResponseBadRequest("Bad request")
            data = gmaps.places_autocomplete(input_text=query[:50])
            return JsonResponse(data, safe=False)
        return HttpResponseBadRequest("Bad request")

class ReverseGeocodeView(APIView):
    """Returns reverse geocode for a given location
        
    GET request parameters: 
        [REQUIRED]
        lat: latitude of the location
            
        long: longitude of the location

        accuracy: API to be used. If value is high then google api will 
                    be used else inhouse api will be used

    Returns:
        [HttpResponseBadRequest] -- [If  any of the required parameters is
                                        not given.]
        [JsonResponse] -- [Containing the location data]     
    """

    def get(self, request):
        if request.method == 'GET':
            lat = float(request.GET.get('lat', ''))
            lng = float(request.GET.get('long', ''))
            accuracy = request.GET.get('accuracy', '')

            if lat == '' or lng == '':
                return HttpResponseBadRequest("Bad request")
            elif accuracy == 'high':
                data = gmaps.reverse_geocode(latlng=(lat,lng))
                return JsonResponse(data, safe=False)
            else:
                return JsonResponse((rgc.get((lat,lng))))


        return HttpResponseBadRequest("Bad request")

class IPLocationView(APIView):
    """Geocodes a request using IP  
    
    Returns:
        [HttpResponseBadRequest] -- [If  any of the required parameters is
                                        not given.]
        [JsonResponse] -- [Containing the location data] 
    """

    def get(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[-1]
            print(x_forwarded_for)
        else:
            ip = request.META.get('REMOTE_ADDR')
        return JsonResponse(gc.ip(ip).json, safe=False)