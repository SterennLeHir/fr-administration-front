import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {FooterComponent} from "../footer/footer.component";
import {NgForOf} from "@angular/common";
import {UserItemComponent} from "../user-item/user-item.component";
import {AssociationItemComponent} from "../association-item/association-item.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";

@Component({
  selector: 'app-associations-list',
  standalone: true,
  imports: [
    NavComponent,
    MatTableModule,
    FooterComponent,
    NgForOf,
    UserItemComponent,
    AssociationItemComponent,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './associations-list.component.html',
  styleUrl: './associations-list.component.css'
})
export class AssociationsListComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) {}


  dataSource: any= [];
  ngOnInit(): void {
    const request: Observable<any> = this.http.get('http://localhost:3000/associations', {observe: 'response'});
    console.log(lastValueFrom(request));
    lastValueFrom(request).then(response => this.dataSource = response.body);
  }

  search(e: KeyboardEvent) {
    const searchTerm = (e.target as HTMLInputElement).value;
    if (searchTerm === "") {
      const request: Observable<any> = this.http.get('http://localhost:3000/associations/', {observe: 'response'});
      lastValueFrom(request).then(response => this.dataSource = response.body);
    } else if (e.key === 'Enter') {
      // La touche Entrée a été enfoncée
      // Récupérer la valeur de la barre de recherche
      const searchTerm = (e.target as HTMLInputElement).value;
      this.dataSource = [];
      const request: Observable<any> = this.http.get('http://localhost:3000/associations/' + searchTerm, {observe: 'response'});
      lastValueFrom(request).then(response => {
        console.log("pas d'erreur");
        this.dataSource.push(response.body);
      })
        .catch(e => console.log(e.error.message));
      }
    }
}
