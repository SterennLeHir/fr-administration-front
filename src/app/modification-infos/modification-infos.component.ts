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
    private router: Router
  ) {}

  validate(): void {
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.post({ endpoint: '/auth/login', data: { username: email, password }}).then(response => {
      console.log("La réponse est : ${response}");
      this.router.navigateByUrl('/account');
    })
  };
}
