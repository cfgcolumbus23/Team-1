from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Children

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

def get_child_name(request, child_id):
    try:
        child = Children.objects.get(id=child_id)
        child_name = child.name
        data = {'child_name': child_name}
        return JsonResponse(data)
    except Children.DoesNotExist:
        return JsonResponse({'error': 'Child not found'}, status=404)
    
