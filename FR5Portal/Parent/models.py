from django.db import models

# Create your models here.
class Orgs(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=500)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)

class Inter(models.Model):
    name = models.CharField(max_length=200)
    specialty = models.CharField(max_length=200)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)