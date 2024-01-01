import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {TokenStorageService} from "../services/token-storage.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLinkActive,
    NgIf,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  messageError !: string;
  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  register(): void {
    const lastname : string = (document.getElementById('nom') as HTMLInputElement).value;
    const firstname : string = (document.getElementById('prenom') as HTMLInputElement).value;
    const age : string = (document.getElementById('age') as HTMLInputElement).value;
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const password: string = (document.getElementById('mdp') as HTMLInputElement).value;
    console.log("éléments : ")
    console.log(lastname, firstname, age, email, password);
    this.api.post({ endpoint: '/auth/register', data: { firstname, lastname, age, email, password }}).then(response => {
      this.api.post({ endpoint: '/auth/login', data: { username: email, password }}).then(response => {
        this.tokenStorageService.save(response.access_token, response.id);
        if(this.tokenStorageService.isLogged()) this.router.navigateByUrl('/home');
        else console.log("Votre compte n'a pas été créé");
      })
    })
      .catch((error) => {
          this.messageError = error.error.message;
      })
  };
}
