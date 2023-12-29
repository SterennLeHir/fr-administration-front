import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-associations-list',
  standalone: true,
    imports: [
        NavComponent,
        MatTableModule,
        FooterComponent
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
  displayedColumns: string[] = ['id', 'name'];
  dataSource= [];
}
