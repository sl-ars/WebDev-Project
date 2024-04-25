import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  login: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  retypePassword: string = '';

  showNotification: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService,
              private route: Router) { }

  ngOnInit(): void {
  }

  showError(errorText: string){
    this.errorMessage = errorText;
        this.showNotification = true;

        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
  }
  Register(){
      if (this.password != this.retypePassword){
        this.showError("Passwords do not match!");
        return;
      }

      this.userService.createUser(this.login, this.password, this.name, this.surname, this.email).subscribe(
        (data) => {
          alert("Success! Please log in")
          this.route.navigateByUrl('login')
        },
        err => {
            this.showError("Error");
        }
      );
      //this.email = this.surname = this.name = this.password = this.login = "";
  }

}
