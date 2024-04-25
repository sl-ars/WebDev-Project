import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { PortfolioElement } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  BASE_URL = "http://127.0.0.1:8000/"

  constructor(
    private http: HttpClient
  ) { }

  getPortfolioElements(): Observable<PortfolioElement[]>{
    return this.http.get<PortfolioElement[]>(`${this.BASE_URL}api/portfolio/`);
  }

  addPortfolioElement(c_id: Number, quantity: Number):
   Observable<PortfolioElement>{
    return this.http.post<PortfolioElement>(`${this.BASE_URL}api/portfolio/`, {
      "currency_id": c_id,
      "quantity": quantity
    })
  }

  deletePortfolioElement(id: Number) {
    return this.http.delete(`${this.BASE_URL}api/portfolio/${id}/`)
  }

  updatePortfolioElement(portfolioElement: PortfolioElement):
   Observable<PortfolioElement>{
    return this.http.put<PortfolioElement>(`${this.BASE_URL}api/portfolio/${portfolioElement.id}/`, {
      "user_id": portfolioElement.user_id,
      "currency_id": portfolioElement.currency_id,
      "quantity": portfolioElement.quantity
    })
  }


}
