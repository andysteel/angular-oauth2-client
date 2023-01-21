import { Component, OnDestroy } from '@angular/core';
import { faLock} from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  faLock = faLock
  hoje: Date = new Date();
  subs: Subscription[] = []

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  doLogin() {
    this.authService.initLogin(this.hoje.getTime().toString());
  }

}
