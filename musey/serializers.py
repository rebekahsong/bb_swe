from rest_framework import serializers 
from musey.models import Songs, Ratings
 
class SongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ['song_title', 'artist_name', "avgRating"]

class RatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ['usernameSong', 'username', "song", "rating"]
