import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.doLogout()
    .then((_) => window.location.reload())
    .catch(error => console.error(error));
  }
}
