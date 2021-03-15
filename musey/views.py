from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
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
                    return HttpResponse("No reviews by this user")
            else:
                return HttpResponse("Please enter a valid username")

    if request.method == 'GET':
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