import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  newPassword: string;
  newPasswordCheck: string;

  constructor(private notificationService: NotificationService, private authService: AuthService) { }

  ngOnInit() {
  }

  changePassword(){
    if(this.newPassword.localeCompare(this.newPasswordCheck) != 0){
      this.notificationService.error('Heslá sa nezhodujú!');
    }else{
      this.authService.changePassword(this.newPassword).then(value => this.authService.logout());
    }
  }
}
