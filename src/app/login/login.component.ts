import { Component } from '@angular/core';
import {ApiHelperService} from "../services/api-helper.service";
import {HttpClientModule} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(
      private api: ApiHelperService,
      private tokenStorageService: TokenStorageService,
      private router: Router
) {}

login(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.post({endpoint: '/auth/login', data: { username, password }}).then(response => {
      this.tokenStorageService.save(response.access_token);
      if(this.tokenStorageService.isLogged())  this.router.navigateByUrl('/users');
      else console.log("Mauvais mot de passe et/ou username");
    })
    };
}