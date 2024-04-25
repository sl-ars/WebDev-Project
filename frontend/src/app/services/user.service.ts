import { Injectable } from '@angular/core';
import {Balance, Portfolio, User, AuthToken, PortfolioElement} from "../../models";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = "http://127.0.0.1:8000/"

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  //FAKE DATA
  /*getUser(): Observable<User>{
    return this.http.get<User>('/assets/jsons/user.json');
  }

  getBalance(): Observable<Balance>{
    return this.http.get<Balance>('/assets/jsons/balance.json');
  }

  getPortfolio(): Observable<Portfolio[]>{
    return this.http.get<Portfolio[]>('assets/jsons/portfolio.json');
  }

  //added requests
  createUser(login: String, name: String, last_name: String,
    password: String): Observable<User>{
    return this.http.post<User>('assets/jsons/portfolio.json', {
      login,
      name,
      last_name,
      password
    });
  }

  login(login: String, password: String): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.BASE_URL}api/login/`, {
      "username": login,
      "password": password
    })
  }*/

  getUser(): Observable<User>{
    return this.http.get<User>(`${this.BASE_URL}api/user/`);
  }

  //added requests
  createUser(login: string, password: string, name:string, surname:string, email:string): Observable<User>{
    return this.http.post<User>(`${this.BASE_URL}api/register/`, {
      "username": login,
      "password": password,
      "first_name": name,
      "last_name": surname,
      "email": email
    });
  }

  updateUser(username: string, name:string, surname:string, email:string): Observable<User>{
    return this.http.put<User>(`${this.BASE_URL}api/user/`, {
      "username": username,
      "first_name": name,
      "last_name": surname,
      "email": email
    });
  }

  login(login: String, password: String): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.BASE_URL}api/login/`, {
      "username": login,
      "password": password
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  alert(message: string){
    alert(message);
  }


}
