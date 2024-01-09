import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent /*implements OnInit*/ {
  title = 'auth-test';

  constructor(private authService: AuthService) {

  }

  // async ngOnInit(): Promise<void> {
  //   console.log('LOGIN ' + await this.authService.doLogin());
  // }
}
