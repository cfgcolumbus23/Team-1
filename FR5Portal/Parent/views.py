from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def testing(request):
    return HttpResponse("Testing")

def see_intervention_plan(request):
    return HttpResponse("Here goes the intervention plan")

def greet_parent(request,name):
    return HttpResponse(f"Hello, {name}")

def FirstPage(request, name):
    return render(request,"FirstPage.html", {
        "name": name.capitalize()
    })
