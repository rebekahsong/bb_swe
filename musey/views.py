from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .serializers import CreateUserSerializer, SongsSerializer, RatingsSerializer
from rest_framework.decorators import api_view
from .models import Users, Songs, Ratings
import json

@api_view(['GET', 'POST', 'DELETE'])
def songs_list(request):
    if request.method == 'GET':
        songs = Songs.objects.all()
        for song in songs: 
            song.avgRating = song.avgRating()
        
        song_title = request.GET.get('song_title', None)
        if song_title is not None:
            song = songs.filter(title__icontains=song_title)

        songs_serializer = SongsSerializer(songs, many=True)
        return JsonResponse(songs_serializer.data, safe=False)

    elif request.method == 'POST':
        song_data = JSONParser().parse(request)
        songs_serializer = SongsSerializer(data=song_data)
        if songs_serializer.is_valid():
            songs_serializer.save()
            return JsonResponse(songs_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(songs_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Songs.objects.all().delete()
        return JsonResponse({'message': '{} Songs were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def song_detail(request, song_title):
    try: 
        song = Songs.objects.get(song_title=song_title) 
    except Songs.DoesNotExist: 
        return JsonResponse({'message': 'The song does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET': 
        songs_serializer = SongsSerializer(song) 
        return JsonResponse(songs_serializer.data)

    elif request.method == 'PUT': 
        song_data = JSONParser().parse(request)
        print(song_data)
        if song_title != song_data['song_title']:
            song_to_del = Songs.objects.get(song_title=song_title)
            song_to_del.delete()
            songs_serializer = SongsSerializer(data=song_data)
            if songs_serializer.is_valid():
                songs_serializer.save()
                return JsonResponse(songs_serializer.data) 
            return JsonResponse(songs_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        songs_serializer = SongsSerializer(song, data=song_data) 
        if songs_serializer.is_valid(): 
            songs_serializer.save() 
            return JsonResponse(songs_serializer.data) 
        return JsonResponse(songs_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        song.delete() 
        return JsonResponse({'message': 'Song was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def deleteRating(request, usernameSong):
    if request.method == 'DELETE':        
        try:
            rating_to_del = Ratings.objects.get(usernameSong=usernameSong)
            rating_to_del.delete()
        except:
            return JsonResponse({'message':'could not delete rating'}, status=status.HTTP_400_BAD_REQUEST)

        return JsonResponse({'message': '{} Rating was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)



@api_view(['PUT', 'POST'])
def ratings(request):
    ratings_data = JSONParser().parse(request)

    if request.method == 'POST':
        try:
            userString = ratings_data['username']
            userDict = json.loads(userString)
            username = userDict.get("username")
            songTitle = ratings_data["song"]
            rating = ratings_data["rating"]
        except Users.BadData:
            return JsonResponse({'message': 'Bad Data'}, status=status.HTTP_400_BAD_REQUEST)

        try: 
            user = Users.objects.get(username=username)     
            song = Songs.objects.get(song_title=songTitle) 
            usernameSong = username + songTitle      
        except Users.DoesNotExist: 
            return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        ratingsDict = {}
        ratingsDict.update({'usernameSong': usernameSong, 'username': user, 'song': song, 'rating': rating})
        ratings_serializer = RatingsSerializer(data=ratingsDict)

        if ratings_serializer.is_valid():
            ratings_serializer.save()
            return JsonResponse(ratings_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(ratings_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT': 
        try:
            userString = ratings_data['username']
            userDict = json.loads(userString)
            username = userDict.get("username")
            songTitle = ratings_data["song"]
            rating = ratings_data["rating"]
        except Users.BadData:
            return JsonResponse({'message': 'Bad Data'}, status=status.HTTP_400_BAD_REQUEST)

        try: 
            user = Users.objects.get(username=username)     
            song = Songs.objects.get(song_title=songTitle) 
            usernameSong = username + songTitle      
        except Users.DoesNotExist: 
            return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        try: 
            rating_to_update = Ratings.objects.get(usernameSong = usernameSong)
            rating_to_update.rating = rating
            rating_to_update.save()
        except: 
            return JsonResponse({'message':'could not update rating'}, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse({'message':'success updating rating'}, status=status.HTTP_201_CREATED)

        
# @api_view(['POST'])
# def setuser(request):
#     if request.method == "POST":
#         try:
#             data = JSONParser().parse(request)
#             username = data['username']
#             user = Users.objects.get(username=username)
#         except Users.DoesNotExist:
#             user = Users.objects.create(username=username)
#             print("user created")
#         except:
#             print('bad')
#     return JsonResponse({'message': 'User Logged In!'}, status=status.HTTP_204_NO_CONTENT)

class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # We create a token than will be used for future auth
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)