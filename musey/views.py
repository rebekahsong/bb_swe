from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from .models import Users, Songs, Ratings, Artists

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

    if request.method == 'GET':
        if 'getArtistSign' in request.GET:
            artistName = request.GET.get("artist_name", None)
            if artistName:
                try:
                    artistInfo = Artists.objects.get(artist_name=artistName)
                    name = artistInfo.artist_name
                    birthplace = artistInfo.birthplace
                    astrologicalSign = artistInfo.astrological_sign
                    genre = artistInfo.genre
                    context = {'artistName':name, 'artistGenre':genre, 'artistBirthplace':birthplace, 'artistAstro':astrologicalSign}
                    return render(request, 'musey/index.html', context )
                except:
                    context = {'artistName': "Invalid Artist Name"}
                    return render(request, 'musey/index.html', context)
            else:
                context = {'signResponse': "Please enter an Artist's Name"}
                return render(request, 'musey/index.html', context)
        else:
            return render(request, 'musey/index.html', {'template': 'musey/blank.html'})

    return HttpResponse("You're fucked")

# def getRatings(request):
#     if request.method == 'POST':
#
#
#     if request.method == 'GET':
#         return render(request, 'musey/index.html')
#
#     return HttpResponse("You're fucked")

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)