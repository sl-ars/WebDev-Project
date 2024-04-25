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
    localStorage.removeItem('access');
    this.router.navigateByUrl('');
  }

  alert(message: string){
    alert(message);
  }


}
