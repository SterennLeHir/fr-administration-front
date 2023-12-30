import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiHelperService} from "../services/api-helper.service";
import {TokenStorageService} from "../services/token-storage.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NavComponent, FooterComponent, NgIf, RouterLinkActive, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  constructor(private token: TokenStorageService, private api: ApiHelperService) {}
  ngOnInit(): void {
    this.api.get({endpoint : '/users/'+this.token.getUserId()}).then(response => this.user = response);
  }
  user!:any;
}
