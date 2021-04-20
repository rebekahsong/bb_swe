from rest_framework import serializers 
from musey.models import Songs
 
class SongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ['song_title', 'artist_name', "avgRating"]
