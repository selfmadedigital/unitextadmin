import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {AuthGuard} from '../_helpers/auth.guard';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private authGuard: AuthGuard, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  get currentUser() {
    return this.authService.currentUserValue.username;
  }

  isLogged(){
    if(this.authGuard.canActivate(null,null)){
      return true;
    }
    return false;
  }
}
