import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-associations-list',
  standalone: true,
    imports: [
        NavComponent
    ],
  templateUrl: './associations-list.component.html',
  styleUrl: './associations-list.component.css'
})
export class AssociationsListComponent {

}
