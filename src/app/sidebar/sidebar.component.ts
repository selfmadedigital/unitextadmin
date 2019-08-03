import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AuthGuard} from '../auth/auth.guard';
import {StorageService} from '../_services/storage.service';
import {User} from '../_models/user';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  username: string;

  constructor(private authGuard: AuthGuard, private authService: AuthService, private storage: StorageService,public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit(): void {
    this.storage.getUsername().subscribe(value => this.username = value);
  }

  isLogged() {
    return !this.authService.isTokenExpired();
  }

  logout() {
    this.authService.logout();
  }
}
