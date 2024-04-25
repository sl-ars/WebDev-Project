from django.db import models
import requests
from requests import Session
from api.secrets import API_KEY
from django.http.response import JsonResponse
import json
import random

from django.contrib.auth.models import User
from django.db import models

# Create your models here.

#Nur's class
class Balance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='balance')
    balance = models.FloatField(default=0)
    image = models.ImageField(upload_to='media/', max_length=254, default='')

    def __str__(self):
        return f"{self.user}"

#Stores historical data (all transactions of all users)
class Transaction(models.Model):
    type = models.CharField(max_length=10, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    currency_id = models.IntegerField(null=True)
    quantity = models.FloatField(null=True)
    price = models.FloatField(null=True)

#Stores current portfolio state of users
class PortfolioElement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    currency_id = models.IntegerField(null=True)
    quantity = models.FloatField(null=True)

class CMC:
    def __init__(self, token):
        self.apiUrl = 'https://pro-api.coinmarketcap.com'
        self.headers = {
              'Accepts': 'application/json',
              'X-CMC_PRO_API_KEY': token,
            }
        self.session = Session()
        self.session.headers.update(self.headers)

    def getAllCoins(self):
        parameters = {
            'start': '1',
            'limit': '20'
        }
        url = self.apiUrl + '/v1/cryptocurrency/listings/latest'
        response = self.session.get(url, params=parameters)
        data = json.loads(response.text)['data']
        return JsonResponse(data, safe=False)

    def getCoinMetadata(self, id):
        parameters = {
            'id': id
        }
        url = self.apiUrl + '/v2/cryptocurrency/info'
        response = self.session.get(url, params=parameters)
        data = json.loads(response.text)['data'][str(id)]
        return JsonResponse(data, safe=False)

    def getCoinDetails(self, id):
        parameters = {
            'id': id
        }
        url = self.apiUrl + '/v2/cryptocurrency/quotes/latest'
        response = self.session.get(url, params=parameters)
        data = json.loads(response.text)['data'][str(id)]
        return JsonResponse(data, safe=False)
