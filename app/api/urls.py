from django.contrib import admin
from django.urls import path
from api.views import currencyList, currencyMetadata, currencyDetails,\
    TransactionAPIView, PortfolioAPIView,\
    a_user, create_user
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    #obtain JWT token
    path('login/', obtain_jwt_token),

    #crypto api related urls
    path('currencies/', currencyList),
    path('currencies/metadata/<int:id>/', currencyMetadata),
    path('currencies/<int:id>/', currencyDetails),

    #local api related urls
    path('transactions/', TransactionAPIView.as_view()),
    path('portfolio/', PortfolioAPIView.as_view()),
    path('portfolio/<int:id>/', PortfolioAPIView.as_view()),

    path('user/', a_user, name='=user'),
    path('register/', create_user, name='register'),
]
