from django.db import models

class Users(models.Model):
    username = models.CharField(primary_key=True, max_length=25)
    password = models.CharField(max_length=25)

    def __str__(self):
        return self.username

class Artists(models.Model):
    artist_name = models.CharField(primary_key=True, max_length=25)
    astrological_sign = models.CharField(max_length=100)
    birthplace = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)

class Songs(models.Model):
    artist_name = models.ForeignKey(Artists, on_delete=models.CASCADE)
    song = models.CharField(primary_key=True, max_length=200)

    def __str__(self):
        return self.song

class Ratings(models.Model):
    username = models.ForeignKey(Users, on_delete=models.CASCADE)
    song = models.ForeignKey(Songs, on_delete=models.CASCADE)
    rating = models.IntegerField(default=-1)

    def __str__(self):
        return self.song.song + " -> " + str(self.rating)
