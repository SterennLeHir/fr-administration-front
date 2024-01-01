import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {FooterComponent} from "../footer/footer.component";
import {NgForOf} from "@angular/common";
import {UserItemComponent} from "../user-item/user-item.component";
import {AssociationItemComponent} from "../association-item/association-item.component";

@Component({
  selector: 'app-associations-list',
  standalone: true,
  imports: [
    NavComponent,
    MatTableModule,
    FooterComponent,
    NgForOf,
    UserItemComponent,
    AssociationItemComponent
  ],
  templateUrl: './associations-list.component.html',
  styleUrl: './associations-list.component.css'
})
export class AssociationsListComponent {

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const request: Observable<any> = this.http.get('http://localhost:3000/associations', { observe: 'response' });
    lastValueFrom(request).then(response => this.dataSource = response.body);
  }
  dataSource= [];
}
