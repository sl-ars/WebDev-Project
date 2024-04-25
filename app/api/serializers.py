import random

from django.contrib.auth.models import User

from rest_framework import serializers

from api.models import Balance, Transaction
from api.models import Transaction, PortfolioElement


from api.secrets import API_KEY
from .models import CMC
import json

class PortfolioElementSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField()
    currency_id = serializers.IntegerField()
    quantity = serializers.FloatField()

    coinDetails = serializers.SerializerMethodField()

    def create(self, validated_data):
        element = PortfolioElement.objects.create(**validated_data)
        return element

    def update(self, instance, validated_data):
        instance.quantity = validated_data.get("quantity")
        instance.save()
        return instance

    def get_coinDetails(self, obj):
        cmc = CMC(API_KEY)
        return json.loads(cmc.getCoinDetails(obj.currency_id).content)

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = '__all__'


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=100, required=False)
    password = serializers.CharField(min_length=8, write_only=True, required=False)

    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()

    balance = serializers.SlugRelatedField(
        read_only=True,
        slug_field='balance'
    )

    def create(self, validated_data):
        new_user = User.objects.create_user(**validated_data)
        Balance(user=new_user, balance=random.randint(1000, 50000)).save()
        return new_user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name')
        instance.last_name = validated_data.get('last_name')
        instance.email = validated_data.get('email')

        #instance.set_password(validated_data.get('password'))

        instance.save()
        return instance

class TransactionSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    class Meta:
        model = Transaction
        fields = ('id', 'type', 'user_id', 'currency_id', 'quantity', 'price')


