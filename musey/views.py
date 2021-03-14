from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from .models import Users, Songs, Ratings

def registerUser(request):
    if request.method == 'POST':
        username = request.POST.get("username", None)
        password = request.POST.get("password", None)
        if username and password:
            try:
                Users.objects.get(username=username)
                #TODO: make this show up on same page as everything else
                return HttpResponse("Username already taken")
            except:
                user = Users()
                user.username = username
                user.password = password
                user.save()
                return render(request, 'musey/index.html')

    if request.method == 'GET':
        return render(request, 'musey/index.html')

    return HttpResponse("You're fucked")

def getRatings(request):
    if request.method == 'POST':
        un_song = request.POST.get("un_song", None)
        if un_song:
            q = Ratings.objects.filter(username=un_song)
            if q:
                return HttpResponse("It worked")
            else:
                return HttpResponse("No reviews by this user")
        else:
            return HttpResponse("Please enter a valid username")

    if request.method == 'GET':
        return render(request, 'musey/index.html')

    return HttpResponse("You're fucked")

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)