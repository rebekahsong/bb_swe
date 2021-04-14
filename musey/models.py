from django.db import models
from django.db.models import Avg

class Users(models.Model):
    username = models.CharField(primary_key=True, max_length=25)
    password = models.CharField(max_length=25)

    def __str__(self):
        return self.username

class Songs(models.Model):
    song_title = models.CharField(primary_key=True, max_length=200)
    artist_name = models.CharField(max_length=100)
    
    @property
    def average_rating(self):
        rating = Ratings.objects.filter(song=self.song_title)
        print(self.ratings_set.aggregate(Avg('rating'))['rating__avg'])

    def __str__(self):
        return self.song_title

class Ratings(models.Model):
    usernameSong = models.CharField(primary_key=True, max_length=200, default='-1')
    username = models.ForeignKey(Users, on_delete=models.CASCADE)
    song = models.ForeignKey(Songs, on_delete=models.CASCADE)
    rating = models.IntegerField(default=-1)

    def __str__(self):
        return self.song.song_title + " -> " + str(self.rating)
