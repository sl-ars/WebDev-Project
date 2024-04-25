from django.shortcuts import render
from api.models import CMC
from api.secrets import API_KEY

# Create your views here.
def currencyList(request):
    cmc = CMC(API_KEY)
    return cmc.getAllCoins()
def currencyMetadata(request, id):
    cmc = CMC(API_KEY)
    return cmc.getCoinMetadata(id)
def currencyDetails(request, id):
    cmc = CMC(API_KEY)
    return cmc.getCoinDetails(id)