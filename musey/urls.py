from django.urls import path, re_path, include
from . import views
from django.contrib import admin


urlpatterns = [
    path('', views.mainView, name='index'),
    path('api', views.songs_list),
    path('api/songs', views.songs_list),
    path('api/ratings', views.ratings),
    path('api/songs/<str:song_title>', views.song_detail),
]