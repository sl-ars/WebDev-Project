import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Portfolio, PortfolioElement, User} from "../../models";
import {PortfolioService} from "../services/portfolio.service";
import {TransactionService} from "../services/transaction.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  user: User | undefined;

  elements: PortfolioElement[] = [];

  investments: String = '0';

  //Sell block parameters
  toPayPrice!: Number;
  quantity!: Number;
  currency_now: PortfolioElement | undefined;


  constructor(
    private userService: UserService,
    private portfolioService: PortfolioService,
    private transactionService: TransactionService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getPortfolio();
  }

  getUser(){
    return this.userService.getUser().subscribe((data) => {
      console.log(data)
      this.user = data;
    });
  }

  getPortfolio(){
    this.portfolioService.getPortfolioElements().subscribe((data) => {
      this.elements = data;
      this.calculateInvestments();
    });
  }

  calculateInvestments(){
    let sum = 0;

    if (this.user) {
      for (let curr of this.elements) {
        sum = sum + (+curr.quantity * +curr.coinDetails.quote.USD.price);
      }
    }

    this.investments = sum.toFixed(2);
  }




  sell() {
    if (this.quantity > 0 && this.currency_now && this.currency_now.quantity>0){
      this.transactionService.addTransaction(
        "SELL", this.currency_now.currency_id, this.quantity,
        Number(this.currency_now.coinDetails.quote.USD.price.toFixed(2))).subscribe((response) => {
        if (response.message == "Success"){
          alert("Currency sold!");
          this.closeSellBlock();
        }
        else {
          alert("Not enough crypto currency!")
        }
      })
    }
    else {
      alert("Quantity should be positive!");
    }
  }

  toPaySellBlock() {
    this.toPayPrice = Number(((Number(this.quantity)
      * Number(this.currency_now?.coinDetails.quote.USD.price)).toFixed(2)));
  }

  openSellBlock(curr: PortfolioElement) {
    this.currency_now = curr;

    let buyBlock = document.getElementById('sell-block') as HTMLElement;
    let background = document.getElementById('main_block') as HTMLElement;

    buyBlock.style.display = 'flex';
    background.style.opacity = '0.2';
    background.style.pointerEvents = 'none';
  }

  closeSellBlock() {
    this.currency_now = undefined;

    let buyBlock = document.getElementById('sell-block') as HTMLElement;
    let background = document.getElementById('main_block') as HTMLElement;

    buyBlock.style.display = 'none';
    background.style.opacity = '1';
    background.style.pointerEvents = 'all';
  }


}
