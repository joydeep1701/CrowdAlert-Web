from rest_framework import serializers
from api.events.models import EventModel

class EventSerialzer(serializers.Serializer):
    category = serializers.CharField()
    comments = serializers.DictField()
    datetime = serializers.DictField()
    description = serializers.DictField()
    image = serializers.DictField()
    location = serializers.DictField()
    share = serializers.DictField()
    report = serializers.DictField()
    title = serializers.CharField()
    user = serializers.DictField()
    visibility = serializers.DictField()

    def create(self, validated_data):
        return EventModel(**validated_data)