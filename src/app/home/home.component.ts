import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  loading = false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUsers().subscribe(users => {
      this.loading = false;
      this.users = users;
      console.log(users);
    });
  }
}
