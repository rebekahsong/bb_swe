## Musey

Group: Rebekah Song and Benjamin Bushnell

We pair programmed for most of this project.
Bekah put more work into Part 1, and wrote the PHP code,
while Ben did the Django setup and wrote most of the 
Django Model and View code. All the rest was done together.

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


