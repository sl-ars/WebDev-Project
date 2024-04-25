from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.models import Transaction, PortfolioElement
from api.serializers import TransactionSerializer, PortfolioElementSerializer
from rest_framework.response import Response
from rest_framework.request import Request
from django.shortcuts import Http404

class TransactionAPIView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        transactions = Transaction.objects.filter(user_id=request.user.id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        currentUser = request.user
        data["user_id"] = currentUser.id
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            userBalance = currentUser.balance.balance
            toPay = (float(data.get("price"))) * (float(data.get("quantity")))
            if (data.get("type") == "BUY"):
                if (userBalance >= toPay):
                    #Updating balance table
                    balance = currentUser.balance
                    balance.balance -= toPay
                    balance.save()
                    #Updating portfolioElement table
                    portfolioElementToUpdate = list(PortfolioElement.objects.filter(user_id=currentUser.id, currency_id=data.get("currency_id")))
                    if (portfolioElementToUpdate != []):
                        portfolioElementToUpdate[0].quantity += float(data.get("quantity"))
                        portfolioElementToUpdate[0].save()
                    else:
                        portfolioElementToCreate = \
                            PortfolioElement.objects.create(
                                currency_id=data.get("currency_id"),
                                user_id=currentUser.id,
                                quantity=data.get("quantity")
                            )
                else:
                    return Response({"message": "Not enough balance"})
            elif (request.data.get("type") == "SELL"):
                # Updating balance table
                balance = currentUser.balance
                balance.balance += toPay
                # Updating portfolioElement table
                portfolioElementToUpdate = PortfolioElement.objects.get(user_id=currentUser.id,
                                                                        currency_id=data.get("currency_id"))
                leftQuantity = portfolioElementToUpdate.quantity - float(data.get("quantity"))
                if leftQuantity < 0:
                    return Response({"message": "Not enough currency"})
                elif leftQuantity == 0:
                    portfolioElementToUpdate.delete()
                    balance.save()
                else:
                    portfolioElementToUpdate.quantity = leftQuantity
                    portfolioElementToUpdate.save()
                    balance.save()
            serializer.save()
            return Response({"message": "Success"})
        return Response(serializer.errors)

class PortfolioAPIView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        portfolioElements = PortfolioElement.objects.filter(user_id=request.user.id)
        serializer = PortfolioElementSerializer(portfolioElements, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        data["user_id"] = request.user.id
        serializer = PortfolioElementSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id):
        portfolioElement = PortfolioElement.objects.get(id=id)
        portfolioElement.delete()
        return Response({'message': 'Element deleted'})

    def put(self, request, id):
        try:
            portfolioElement = PortfolioElement.objects.get(id=id)
        except PortfolioElement.DoesNotExist as e:
            return Http404
        serializer = PortfolioElementSerializer(instance=portfolioElement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

