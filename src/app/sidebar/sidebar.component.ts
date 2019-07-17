import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {AuthGuard} from '../_helpers/auth.guard';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  username: string;

  constructor(private authGuard: AuthGuard, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  isLogged() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
