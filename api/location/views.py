from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest

gmaps = settings.GMAPS

def places_autocomplete(request):
    if request.method == 'GET':
        query = request.GET.get('q', '')
        if query == '':
            return HttpResponseBadRequest("Bad request")
        data = gmaps.places_autocomplete(input_text=query[:50])
        return JsonResponse(data, safe=False)

