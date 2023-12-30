import { Component } from '@angular/core';
import {ApiHelperService} from "../services/api-helper.service";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modification-infos',
  standalone: true,
  imports: [],
  templateUrl: './modification-infos.component.html',
  styleUrl: './modification-infos.component.css'
})
export class ModificationInfosComponent {
  constructor(
    private api: ApiHelperService,
    private router: Router,
    private token: TokenStorageService
  ) {}

  validate(): void {
    const prenom: string = (document.getElementById('prenom') as HTMLInputElement).value;
    const nom: string = (document.getElementById('nom') as HTMLInputElement).value;
    const age: string = (document.getElementById('age') as HTMLInputElement).value;
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    this.api.put({ endpoint: '/users/'+ this.token.getUserId(), data: { firstname: prenom, lastname: nom, age, email}}).then(() => {
      this.router.navigateByUrl('/account');
    })
  };
}
