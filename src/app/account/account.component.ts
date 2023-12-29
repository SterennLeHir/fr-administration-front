import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
