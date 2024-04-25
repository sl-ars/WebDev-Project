import { Component, OnInit, Input } from '@angular/core';
import { User} from "../../models";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService,) { }

  user: User | undefined;

  first_name: string = "";
  last_name: string = "";
  email: string = "";


  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    return this.userService.getUser().subscribe((data) => {
      console.log(data)
      this.user = data;

      this.first_name = this.user.first_name;
      this.last_name = this.user.last_name;
      this.email = this.user.email;
    });
  }

  updateUser(){
    if(this.user){
      this.userService.updateUser(this.user.username, this.first_name, this.last_name, this.email).subscribe(
        (data) => {
          console.log(data);
          alert("Updated!");
        }
      );
    }
  }

}
