from django.contrib import admin
from .models import Balance, Transaction, PortfolioElement
# Register your models here.

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'user', 'currency_id', 'quantity', 'price')

class PortfolioAdmin(admin.ModelAdmin):
    list_display = ('user', 'currency_id', 'quantity')

admin.site.register(Balance)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(PortfolioElement, PortfolioAdmin)

