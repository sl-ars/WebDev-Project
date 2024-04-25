import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../services/currencies.service';
import { Currency } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  currencies!: Currency[];
  loaded!: boolean;

  IdClass = "";
  NameClass = "";
  PriceClass = "";
  Class24h = "";
  Class7d = "";
  MarketCapClass = "";
  VolumeClass = "";
  last_active = "";

  constructor(
    private currenciesService: CurrenciesService,
              ) { }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies() {
    this.loaded = false;
    this.currenciesService.getCurrencyList().subscribe((currencies) => {
      this.currencies = currencies;
      this.loaded = true;
    })
    // this.currencies = currencies_example;
    // this.loaded = true;
  }

  checkLastActive() {
    if (this.last_active == "Id"){
      this.IdClass = "";
    }
    else if (this.last_active == "Name"){
      this.NameClass = "";
    }
    else if (this.last_active == "Price"){
      this.PriceClass = "";
    }
    else if (this.last_active == "24h"){
      this.Class24h = "";
    }
    else if (this.last_active == "7d"){
      this.Class7d = "";
    }
    else if (this.last_active == "MarketCap"){
      this.MarketCapClass = "";
    }
    else if (this.last_active == "Volume"){
      this.VolumeClass = "";
    }
  }

  sortById() {
    if (this.last_active != "Id") this.checkLastActive();
    if (this.IdClass == "descending") {
      this.IdClass = "ascending";
      this.currencies.sort((a, b) => {
        return a.id - b.id;
      });
    }
    else {
      this.IdClass = "descending";
      this.currencies.sort((a, b) => {
        return b.id - a.id;
      });
    }
    this.last_active = "Id";
    console.log(this.IdClass);
  }

  sortByName() {
    if (this.last_active != "Name") this.checkLastActive();
    if (this.NameClass == "descending") {
      this.NameClass = "ascending";
      this.currencies.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    else {
      this.NameClass = "descending";
      this.currencies.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    this.last_active = "Name";



  }

  sortByPrice() {
    if (this.last_active != "Price") this.checkLastActive();
    if (this.PriceClass == "descending") {
      this.PriceClass = "ascending";
      this.currencies.sort((a, b) => {
        return a.quote.USD.price - b.quote.USD.price;
      });
    }
    else {
      this.PriceClass = "descending";
      this.currencies.sort((a, b) => {
        return b.quote.USD.price - a.quote.USD.price;
      });
    }
    this.last_active = "Price";
  }

  sortBy24h() {
    if (this.last_active != "24h") this.checkLastActive();
    if (this.Class24h == "descending") {
      this.Class24h = "ascending";
      this.currencies.sort((a, b) => {
        return a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h;
      });
    }
    else {
      this.Class24h = "descending";
      this.currencies.sort((a, b) => {
        return b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h;
      });
    }
    this.last_active = "24h";
  }

  sortBy7d() {
    if (this.last_active != "7d") this.checkLastActive();
    if (this.Class7d == "descending") {
      this.Class7d = "ascending";
      this.currencies.sort((a, b) => {
        return a.quote.USD.percent_change_7d - b.quote.USD.percent_change_7d;
      });
    }
    else {
      this.Class7d = "descending";
      this.currencies.sort((a, b) => {
        return b.quote.USD.percent_change_7d - a.quote.USD.percent_change_7d;
      });
    }
    this.last_active = "7d";
  }

  sortByMarketCap() {
    if (this.last_active != "MarketCap") this.checkLastActive();
    if (this.MarketCapClass == "descending") {
      this.MarketCapClass = "ascending";
      this.currencies.sort((a, b) => {
        return a.quote.USD.market_cap - b.quote.USD.market_cap;
      });
    }
    else {
      this.MarketCapClass = "descending";
      this.currencies.sort((a, b) => {
        return b.quote.USD.market_cap - a.quote.USD.market_cap;
      });
    }
    this.last_active = "MarketCap";
  }

  sortByVolume() {
    if (this.last_active != "Volume") this.checkLastActive();
    if (this.VolumeClass == "descending") {
      this.VolumeClass = "ascending";
      this.currencies.sort((a, b) => {
        return a.quote.USD.volume_24h - b.quote.USD.volume_24h;
      });
    }
    else {
      this.VolumeClass = "descending";
      this.currencies.sort((a, b) => {
        return b.quote.USD.volume_24h - a.quote.USD.volume_24h;
      });
    }
    this.last_active = "Volume";
  }

}
