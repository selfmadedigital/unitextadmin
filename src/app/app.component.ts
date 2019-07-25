import { Component } from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'star-admin-angular';

  constructor(private authService: AuthenticationService){

  }

  isLogged(){
    if (this.authService.isLoggedIn()){
      return 'logged';
    }else{
      return '';
    }
  }
}
