from django.contrib import admin
from django.urls import path
from .views import currencyList, currencyMetadata, currencyDetails,\
    TransactionAPIView, PortfolioAPIView,\
    a_user, create_user
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    #obtain JWT token
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    #crypto api related urls
    path('currencies/', currencyList),
    path('currencies/metadata/<int:id>/', currencyMetadata),
    path('currencies/<int:id>/', currencyDetails),

    #local api related urls
    path('transactions/', TransactionAPIView.as_view()),
    path('portfolio/', PortfolioAPIView.as_view()),
    path('portfolio/<int:id>/', PortfolioAPIView.as_view()),

    path('user/', a_user),
    path('register/', create_user),
]
