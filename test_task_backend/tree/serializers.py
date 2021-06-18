from rest_framework.serializers import ModelSerializer
from .models import TreeData
from typing import Dict, Union


class TreeSerializer(ModelSerializer):
    class Meta:
        model = TreeData
        fields = "__all__"
