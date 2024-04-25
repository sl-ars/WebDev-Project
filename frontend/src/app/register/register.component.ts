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

  constructor(private userService: UserService,
              private route: Router) { }

  ngOnInit(): void {
  }

  Register(){
      this.userService.createUser(this.login, this.password, this.name, this.surname, this.email).subscribe(
        (data) => {
          alert("Success! Please log in")
          this.route.navigateByUrl('login')
        },
        err => {
          this.userService.alert("Error occured")
        }
      );
      //this.email = this.surname = this.name = this.password = this.login = "";
  }

}
