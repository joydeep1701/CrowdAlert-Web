from django.conf import settings

db = settings.FIREBASE.database()

class EventModel(object):
    def __init__(self, category, comments, datetime, description, image, location, 
        share, report, title, user, visibility):

        self.category = category
        self.comments = comments
        self.datetime = datetime
        self.description = description
        self.image = image
        self.location = location
        self.share = share
        self.report = report
        self.title = title
        self.user = user
        self.visibility = visibility

    def save(self, *args, **kwargs):
        print(args, kwargs)

        


