from django.shortcuts import render
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
import subprocess
import os
from uuid import uuid4
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest

storage = settings.FIREBASE.storage()

@csrf_exempt
def upload(request):
    if request.method == 'POST' and request.FILES['image']:
        # Generate uuid for the file. Never trust user.
        name = str(uuid4())
        uploadedFile = request.FILES['image']
        fs = FileSystemStorage()
        # save
        fs.save(name, uploadedFile)
        # As our load is small now, we can do this in sequential manner
        # After we get enough traffic we should use a redis based solution.
        # Where an event would be pushed and a job id is to be returned
        # and expose another endpoint where we can check the status
        subprocess.run(['node_modules/.bin/sqip', name, '-o', name+'.svg'])
        # Upload files to Cloud storage
        firebaseName = name + '.' + uploadedFile.name.split('.')[-1]
        storage.child('images/' + firebaseName).put(name)
        storage.child('thumbnails/'+name+'.svg').put(name+'.svg')
        # Remove the uploaded files for two good reasons:
        # Keep our dyno clean
        # remove malicious code before anything wrong goes.
        os.remove(name)
        os.remove(name+'.svg')
        # Return file id for future reference
        return JsonResponse({'name': firebaseName})
    return JsonResponse({'status':'OK'})

def get_image_url(request):
    # For now, as API auth has not been set up we are fetching the image 
    # to our local store
    if request.method == 'GET':
        uuid = request.GET.get('uuid','')
        if uuid == '':
            return HttpResponseBadRequest("Bad request")
        url = storage.child('images').child(uuid).get_url('')
        thumbnail_url = storage.child('thumbnails').child(uuid.split('.')[0]+'.svg').get_url('')
        return JsonResponse({'url': url, 'thumbnail': thumbnail_url})

    return HttpResponseBadRequest("Bad request")