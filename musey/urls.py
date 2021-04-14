from django.urls import path
from . import views

urlpatterns = [
    path('', views.mainView, name='index'),
    path('api', views.songs_list),
    path('api/songs', views.songs_list),
    path('api/songs/<str:song_title>', views.song_detail)
]