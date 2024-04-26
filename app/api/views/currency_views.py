from django.shortcuts import render
from ..models import CMC
from ..secrets import API_KEY
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
# Create your views here.

@api_view(['POST', 'GET'])
@permission_classes((permissions.IsAuthenticated,))
def currencyList(request):
    cmc = CMC(API_KEY)
    return cmc.getAllCoins()

@api_view(['POST', 'GET'])
@permission_classes((permissions.IsAuthenticated,))
def currencyMetadata(request, id):
    cmc = CMC(API_KEY)
    return cmc.getCoinMetadata(id)

@api_view(['POST', 'GET'])
@permission_classes((permissions.IsAuthenticated,))
def currencyDetails(request, id):
    cmc = CMC(API_KEY)
    return cmc.getCoinDetails(id)