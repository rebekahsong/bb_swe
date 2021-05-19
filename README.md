## Musey

Group: Rebekah Song and Benjamin Bushnell

## Deployment

### Deploying Django Backend to Heroku

#### Initial Setup

After creating a Heroku account, we created our Heroku app, `bb-swe-musey`. After logging in from CLI and activating our Django backend virtual environmet, we installed various packages for the Heroku production environment. 

#### Code Setup

We created a file for environment variables, `.env`, where we stored our `SECRET_KEY`, changing other occurrences of this key to reference this variable. We then created a Procfile to declare the demands we would run on the Heroku platform. Next, we created a `requirements.txt` to hold onto what we have installed for Heroku as well as Django. Next, the `runtime.txt` to indicate the Python version we are using, and then modifying the existing `settings.py` file for compatibility.

#### Time to Deploy 

We did a quick check to make sure our app still worked locally. It did. Aftwerwards, we entered the Heroku server and setup our Django backend with `makemigrations` and `migrate`. Unfortunately, after visiting `<https://bb-swe-musey.herokuapp.com/>` we discovered this error in the log tails. 

```
2021-05-19T13:18:27.198829+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=bb-swe-musey-21.herokuapp.com request_id=59b51031-5aee-4fc7-a21c-787b7f9de738 fwd="73.219.181.9" dyno= connect= service= status=503 bytes= protocol=https
```

The H10 code error indicates a crashed web dyno or a boot timeout on the web dyno, however we unfortuately weren't able to debug this issue. 

## React Native

Very unfortunately, in the pursuit of getting our deployment working, the React Native code that we were working on which was only locally stored and not pushed to its branch, was lost. Ben created an app with login and logout. He implemented functionality to fetch the songs list and display the list in a scrolling view.

## Virtual Environment

### Part 1)

Use the provided sql code to create the tables and example information necessary for the music-db. index.php can be run on local web server with XAMPP.


### Part 2)

To run the site that we built for Part 2, follow these steps:

#### Create a Virtual Environment:

Install the virtual environment, `venv`, with:

```shell
python3 -m venv venv
```

#### Activate your virtual environment:  

```shell
source venv/bin/activate.fish  
```

You can deactivate your virtual environment with:

```shell
deactivate
```

## Django

#### Install Django

Install Django in your virtual environment:

```shell
python3 -m pip install Django
```

#### Run the Server

from the bb_swe directory:

```shell
python3 manage.py runserver
```

#### Add Users:
Users can be added directly from the webpage. 
Simply enter a username and a password, and click the button.
As long as the username is not already in use, a User will be created.

#### Add Artists, Songs, and Ratings:

Activate the python shell in the Django project:
```shell
python3 manage.py shell
```
In the python shell, 
type:
```shell
from musey.models import Artists, Songs, Users, Ratings
```

An Artist can be added in the following way:
```shell
a = Artists(artist_name="John Lennon", astrological_sign="Leo", birthplace="Liverpool", genre="Rock")
a.save()
```

A Song can be added in the following way:
```shell
s = Songs(artist_name="John Lennon", song="Imagine")
s.save()
```

A Rating can be added in the following way:
```shell
r = Ratings(username="coolman", song="Imagine", rating=5)
r.save()
```


