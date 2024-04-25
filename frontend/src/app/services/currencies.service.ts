import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency, CurrencyMetadata } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  BASE_URL = 'http://127.0.0.1:8000/';

  constructor(
    private http: HttpClient
  ) { }

  getCurrencyList(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.BASE_URL}api/currencies/`);
    //return this.http.get<Currency[]>('/assets/jsons/currencies.json');
  }

  getCurrencyMetadata(id: Number): Observable<CurrencyMetadata> {

    return this.http.get<CurrencyMetadata>(`${this.BASE_URL}api/currencies/metadata/${id}/`);
  }

  getCurrency(id: Number): Observable<Currency> {
    return this.http.get<Currency>(`${this.BASE_URL}api/currencies/${id}/`);
  }

}
