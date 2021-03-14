from django.db import models

class Users(models.Model):
    username = models.CharField(primary_key=True, max_length=25)
    password = models.CharField(max_length=25)

    def __str__(self):
        return self.username

class Songs(models.Model):
    artist_name = models.CharField(max_length=200)
    song = models.CharField(primary_key=True, max_length=200)

class Ratings(models.Model):
    username = models.ForeignKey(Users, on_delete=models.CASCADE)
    song = models.ForeignKey(Songs, on_delete=models.CASCADE)
    rating = models.IntegerField(default=-1)
