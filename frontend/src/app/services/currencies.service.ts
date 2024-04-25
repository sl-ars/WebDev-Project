import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency, CurrencyMetadata } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  BASE_URL = 'http://127.0.0.1:8000/api';

  constructor(private client: HttpClient) { }

  getCurrencyList(): Observable<Currency[]> {
    //return this.client.get<Currency[]>(`${this.BASE_URL}/currencies`);
    return this.client.get<Currency[]>('/assets/jsons/currencies.json');
  }

  getCurrencyMetadata(id: Number): Observable<CurrencyMetadata> {
    return this.client.get<CurrencyMetadata>(`${this.BASE_URL}/currencies/metadata/${id}`);
  }

  getCurrency(id: Number): Observable<Currency> {
    return this.client.get<Currency>(`${this.BASE_URL}/currencies/${id}`);
  }

}
