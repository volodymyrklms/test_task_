from django.urls import path
from .views import TreeView

urlpatterns = [
    path(r"", TreeView.as_view()),
]
