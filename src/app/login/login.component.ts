import { Component } from '@angular/core';
import {ApiHelperService} from "../services/api-helper.service";
import {HttpClientModule} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";
import {User} from "../users-list/users-list.component";

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
  const email: string = (document.getElementById('email') as HTMLInputElement).value;
  const password: string = (document.getElementById('password') as HTMLInputElement).value;
  this.api.post({ endpoint: '/auth/login', data: { username: email, password }}).then(response => {
    console.log("La réponse est : ${response}");
    this.tokenStorageService.save(response.access_token, response.id);
    if(this.tokenStorageService.isLogged()) this.router.navigateByUrl('/home');
    else console.log("Mauvais mot de passe et/ou email");
  })
};
}
