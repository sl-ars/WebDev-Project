import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: String = "";
  password: String = "";

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.navigateToCurrencies();
    }
  }
  //added userService, changed Login()
  Login(){
    // console.log(this.login, this.password);
    this.userService.login(this.login, this.password).subscribe((data) => {
      localStorage.setItem('token', data.token);
      this.navigateToCurrencies();
    })
    this.login = '';
    this.password = '';
  }

  navigateToCurrencies() {
    this.router.navigateByUrl('/user/currencies');
  }

}
