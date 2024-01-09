import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  logout() {
    this.authService.doLogout()
    .then((_) => this.router.navigate(['/login']))
    .catch(error => console.error(error));
  }
}
