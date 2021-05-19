from django.urls import path, re_path, include
from . import views
from .views import CreateUserAPIView, LogoutUserAPIView
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('api', views.songs_list),
    path('api/songs', views.songs_list),
    path('api/ratings', views.ratings),
    # path('api/setuser', views.setuser),
    re_path(r'^api/login/$',
        obtain_auth_token,
        name='auth_user_login'),
    re_path(r'^api/register/$',
        CreateUserAPIView.as_view(),
        name='auth_user_create'),
    re_path(r'^api/logout/$',
        LogoutUserAPIView.as_view(),
        name='auth_user_logout'),
    path('api/ratings/<str:usernameSong>', views.deleteRating),
    path('api/songs/<str:song_title>', views.song_detail),
]