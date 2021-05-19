from django.urls import path, re_path, include
from . import views
from django.contrib import admin


urlpatterns = [
    path('api', views.songs_list),
    path('api/songs', views.songs_list),
    path('api/ratings', views.ratings),
    path('api/setuser', views.setuser),
    path('api/ratings/<str:usernameSong>', views.deleteRating),
    path('api/songs/<str:song_title>', views.song_detail),
]