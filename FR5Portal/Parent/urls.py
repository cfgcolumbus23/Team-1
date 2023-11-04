from django.urls import path
from . import views

urlpatterns = [
    path("", views.testing, name = "test"),
    path("Intervention", views.see_intervention_plan, name= "Intervention" ),
    path("<str:name>", views.greet_parent, name= "greet"),
    path('child/<int:child_id>/name/', views.get_child_name, name='get_child_name'),
]