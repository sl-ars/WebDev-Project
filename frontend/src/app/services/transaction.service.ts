import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Message, Transaction } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  BASE_URL = "http://127.0.0.1:8000/"

  constructor(private http: HttpClient) { }

  getTransactions(u_id: Number): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.BASE_URL}api/transactions/${u_id}/`);
  }

  addTransaction(type: String, currency_id: Number,
    quantity: Number, price: Number):
   Observable<Message>{
    return this.http.post<Message>(`${this.BASE_URL}api/transactions/`, {
      type,
      currency_id,
      quantity,
      price
    })
  }
}
