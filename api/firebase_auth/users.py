from django.contrib.auth.models import User

class FirebaseUser(User):
    def __init__(self, firebase_data):
        super().__init__(username=firebase_data.get('uid'))
        self.uid = firebase_data.get('user_id')
        self.name = firebase_data.get('name')
        # Allow activity from verified email
        User.is_authenticated = firebase_data.get('email_verified', False)
        print("Logged in as", self.name)