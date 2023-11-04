from django.db import models

# Create your models here.
class user(models.Model):
    id = models.IntegerField()
    name = models.TextField()
    email = models.TextField()
    phone_number = models.CharField(max_length=20)
    hash = models.TextField()
    salt = models.TextField()

class roles(models.Model):
    id = models.IntegerField()
    desc = models.TextField()

class reports(models.Model):
    id = models.IntegerField()