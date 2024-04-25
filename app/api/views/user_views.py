#Django
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

#REST
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

# Custom files
from api.serializers import UserSerializer, BalanceSerializer

@api_view(['GET', 'PUT'])
@permission_classes((permissions.IsAuthenticated,))
def a_user(request):
    '''
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    '''

    if request.method == "GET":
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = UserSerializer(instance=request.user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def create_user(request):
    if request.method == "POST":
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)