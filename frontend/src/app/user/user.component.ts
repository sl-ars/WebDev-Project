import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../../models";
import {ProfileComponent} from "../profile/profile.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {
  user: User | undefined;
  isLogged = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(){
    this.getUser();
    const token = localStorage.getItem('token');
    if (token) this.isLogged = true;
    else {
      this.router.navigateByUrl("login");
    }
  }

  showNav(){
    let item = document.getElementById('side') as HTMLElement;
    let button = document.getElementById('nav_button') as HTMLElement;

    if(item.style.visibility=='hidden'){
      button.style.visibility = 'hidden';
      item.style.visibility = 'initial';
      item.style.left = '0';
    }else{
      item.style.visibility = 'hidden';
      item.style.left = '-30%';
      button.style.visibility = 'initial';
    }
  }

  getUser(){
    return this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

}
