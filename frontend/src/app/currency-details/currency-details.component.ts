import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Currency, CurrencyMetadata } from '../../models';
import { CurrenciesService } from '../services/currencies.service';
import { PortfolioService } from '../services/portfolio.service';
import { TransactionService } from '../services/transaction.service';


@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {

  currency!: Currency;
  currencyMetadata!: CurrencyMetadata;
  loaded!: Boolean;
  cryptoAmount!: Number;
  resultUSD!: Number;

  //Buy block parameters
  toPayPrice!: Number;
  quantity!: Number;


  constructor(private currenciesService: CurrenciesService,
    private route: ActivatedRoute, 
    private portfolioService: PortfolioService,
    private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getCurrencyData();
    this.cryptoAmount = 1;
    this.resultUSD = Number(this.currency.quote.USD.price.toFixed(2));
  }

  buy() {
    if (this.quantity > 0){
      this.transactionService.addTransaction(
        "BUY", this.currency.id, this.quantity,
        Number(this.currency.quote.USD.price.toFixed(2))).subscribe((response) => {
          if (response.message == "Success"){
            alert("Currency bought!");
            this.closeBuyBlock();
          }
          else {
            alert("Not enough balance!")
          }
        })
    }
    else {
      alert("Quantity should be positive!");
    }
  }

  toPayBuyBlock() {
    this.toPayPrice = Number(((Number(this.quantity)
      * Number(this.currency.quote.USD.price)).toFixed(2)));
  }

  openBuyBlock() {
    let buyBlock = document.getElementById('buy-block') as HTMLElement;
    let background = document.getElementById('details-page') as HTMLElement;

    buyBlock.style.display = 'flex';
    background.style.opacity = '0.2';
    background.style.pointerEvents = 'none';
  }

  closeBuyBlock() {
    let buyBlock = document.getElementById('buy-block') as HTMLElement;
    let background = document.getElementById('details-page') as HTMLElement;
    buyBlock.style.display = 'none';
    background.style.opacity = '1';
    background.style.pointerEvents = 'all';
  }


  getCurrencyData() {
    this.loaded = false;
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.currenciesService.getCurrencyMetadata(+id).subscribe((currencyMetadata) => {
          this.currencyMetadata = currencyMetadata;
          this.currenciesService.getCurrency(+id).subscribe((currency) => {
            this.currency = currency;
            this.loaded = true;

            console.log(this.currency);
            console.log(this.currencyMetadata);
          })
        })
      }
    })

    // this.route.paramMap.subscribe((params) => {
    //   this.loaded = false;
    //     const id = params.get('id');
    //     if (id !== null) {
    //       this.currency = currencies_example.filter((c) => c.id = +id)[0];
    //       this.currencyMetadata = currency_metadata_example;
    //       this.loaded = true;
    //     }
    // })
  }


  getCurrencyMetadata(id: Number) {
    this.currenciesService.getCurrencyMetadata(id).subscribe((currencyMetadata) => {
      this.currencyMetadata = currencyMetadata;
    })
  }


  getCurrency(id: Number) {
    this.currenciesService.getCurrency(id).subscribe((currency) => {
      this.currency = currency;
    })
  }

  Convert() {
    this.resultUSD = Number(((Number(this.cryptoAmount)
      * Number(this.currency.quote.USD.price)).toFixed(2)));
  }

}
