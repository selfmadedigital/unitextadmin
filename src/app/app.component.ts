import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'star-admin-angular';

  constructor(private authService: AuthService){
  }

  isLogged(){
    if (!this.authService.isTokenExpired()){
      return 'logged';
    }else{
      return '';
    }
  }
}
