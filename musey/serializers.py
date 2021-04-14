from rest_framework import serializers 
from musey.models import Songs, Artists
 
class SongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ['song_title', 'artist_name']

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = ['artist_name', 'astrological_sign', 'birthplace', 'genre']