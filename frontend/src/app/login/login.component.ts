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
  showNotification: boolean = false;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('access');
    if (token) {
      this.navigateToCurrencies();
    }
  }
  //added userService, changed Login()
  Login() {
    this.userService.login(this.login, this.password).subscribe(
      (data) => {
        localStorage.setItem('access', data.access);
        this.navigateToCurrencies();
      },
      (error) => {

        this.showNotification = true;

        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      }
    );
    this.login = '';
    this.password = '';

  }

  navigateToCurrencies() {
    this.router.navigateByUrl('/user/currencies');
  }

}
