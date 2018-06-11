from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from django.core.files.storage import FileSystemStorage
import subprocess
import os
from uuid import uuid4
import base64
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest

storage = settings.FIREBASE.storage()
db = settings.FIREBASE.database()


class ImagesView(APIView):
    """Images class for API view. Allows users to get urls of an image using
    uuid & upload images to cloud storage by specifying either file object
    or base64 equivalent.
    """

    def get(self, request):
        """Allow users to get the corresponding image url for a given image 
        uuid specified as a GET parameter.

        GET request parameters:
            uuid: uuid of the image whose urls are to be fetched. [Required]
        
        Arguments:
            request {[type]} -- [ Contains the django request object]
        
        Returns:
            [HttpResponseBadRequest] -- [If  no uuid GET parameter is provided]
            [JsonResponse] -- [Containing the url & thumbnail url of image]

        """
        
        uuid = request.GET.get('uuid','')
        if uuid == '':
            return HttpResponseBadRequest("Bad request: Specify the image uuid")
        url = storage.child('images').child(uuid).get_url('')
        thumbnail_url = storage.child('thumbnails').child(uuid.split('.')[0]+'.svg').get_url('')
        return JsonResponse({'url': url, 'thumbnail': thumbnail_url})

    def post(self, request):
        """Allow users to post images i.e upload images to cloud storage.
        
        POST request parameters: 
            [REQUIRED]
            image: containing a file object for the image to be uploaded 
                or
            base64: containig the base64 equivalent of the image to be uploaded

            [OPTIONAL]
            eventId: containg the event id of the event where the image will be
                    rendered
            isTrusted: whether the image came from a trusted source or not


        Arguments:
            request {[type]} -- [ Contains the django request object]
        
        Returns:
            [HttpResponseBadRequest] -- [If  neither image or base64 parameter 
                                        is provided]
            [JsonResponse] -- [Containing the uuid of image]     
        """

        # Generate uuid for the file. Never trust user.
        name = str(uuid4())

        if request.FILES.get('image', False):            
            uploadedFile = request.FILES['image']
            fs = FileSystemStorage()
            # save
            fs.save(name, uploadedFile)
            firebaseName = name + '.' + uploadedFile.name.split('.')[-1]

        elif request.POST.get('base64', False):
            data_uri = request.POST['base64']
            name = str(uuid4())
            img = base64.decodestring(str.encode(data_uri.split(",")[1]))
            with open(name, "wb") as fh:
                fh.write(img)
            firebaseName = name + '.jpg'
        else:
            return HttpResponseBadRequest("Bad request: Either base64 or image field should be given")
        
        # As our load is small now, we can do this in sequential manner
        # After we get enough traffic we should use a redis based solution.
        # Where an event would be pushed and a job id is to be returned
        # and expose another endpoint where we can check the status
        subprocess.run(['node_modules/.bin/sqip', name, '-o', name+'.svg'])
        # Upload files to Cloud storage
        storage.child('images/' + firebaseName).put(name)
        storage.child('thumbnails/'+name+'.svg').put(name+'.svg')        
        # Remove the uploaded files for two good reasons:
        # Keep our dyno clean
        # remove malicious code before anything wrong goes.
        os.remove(name)
        os.remove(name+'.svg')
        # Update Event if id is given,
        if request.POST.get("eventId", False):
            event_id = request.POST.get("eventId", False)
            is_trusted = request.POST.get('isValid', '') == 'true'
            image_data = {"isNsfw": False, "isTrusted": is_trusted, "uuid": firebaseName}
            db.child('incidents').child(event_id).child("images").push(image_data)
            print("Image Added")
        # Return file id for future reference
        return JsonResponse({'name': firebaseName})
