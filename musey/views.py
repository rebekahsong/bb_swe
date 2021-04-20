from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from .serializers import SongsSerializer
from rest_framework.decorators import api_view
from .models import Users, Songs, Ratings

def mainView(request):
    if request.method == 'POST':
        if 'createAccount' in request.POST:
            username = request.POST.get("username", None)
            password = request.POST.get("password", None)
            if username and password:
                try:
                    Users.objects.get(username=username)
                    context = {'createAccountResponse': "Username already taken"}
                    return render(request, 'musey/index.html', context)
                except:
                    user = Users()
                    user.username = username
                    user.password = password
                    user.save()
                    context = {'createAccountResponse': "successfuly registered"}
                    return render(request, 'musey/index.html', context)
            else:
                context = {'createAccountResponse': "please enter a valid username and password"}
                return render(request, 'musey/index.html', context)
        elif 'retrieveSongs' in request.POST:
            un_song = request.POST.get("un_song", None)
            if un_song:
                q = Ratings.objects.filter(username=un_song)
                if q:
                    songsAndRatings = ""
                    for songRating in q:
                        song = songRating.song.song
                        rating = songRating.rating
                        songsAndRatings += song + " -> " + str(rating) + "\n"
                    context = {'songsRatingsResponse':songsAndRatings}
                    return render(request, 'musey/index.html', context )
                else:
                    context = {'songsRatingsResponse':"No review by this user"}
                    return render(request, 'musey/index.html', context )
            else:
                context = {'songsRatingsResponse':"Please enter a valid username"}
                return render(request, 'musey/index.html', context )

    return HttpResponse("You're fucked")

@api_view(['GET', 'POST', 'DELETE'])
def songs_list(request):
    # GET list of songs, POST a new song, DELETE all songs
    if request.method == 'GET':
        songs = Songs.objects.all()
        for song in songs: 
            song.avgRating.update(avgRating=song.avgRating())
        
        song_title = request.GET.get('song_title', None)
        if song_title is not None:
            song = songs.filter(title__icontains=song_title)

        songs_serializer = SongsSerializer(songs, many=True)
        return JsonResponse(songs_serializer.data, safe=False)

    elif request.method == 'POST':
        song_data = JSONParser().parse(request)
        songs_serializer = SongsSerializer(data=song_data)
        #print(songs_serializer)
        if songs_serializer.is_valid():
            songs_serializer.save()
            return JsonResponse(songs_serializer.data, status=status.HTTP_201_CREATED)
        #print(song_data)
        #try:
        #    artist
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
        #if the update has changed the title of the song, delete the old song.
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

 
    
        