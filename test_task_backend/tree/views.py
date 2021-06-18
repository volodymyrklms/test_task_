from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from .models import TreeData
from .serializers import TreeSerializer


class TreeView(RetrieveAPIView):
    queryset = TreeData.objects.all()
    serializer_class = TreeSerializer

    def get(self, request, *args, **kwargs):
        parent = request.GET.get("parent", None)
        queryset = self.queryset.filter(parent=parent).all()
        data = self.serializer_class(queryset, many=True).data
        return Response(data, status=status.HTTP_200_OK)
