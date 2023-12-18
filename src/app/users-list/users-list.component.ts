import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {NavComponent} from "../nav/nav.component";

export class User {
  constructor(
    public id: number,
    public password: string,
    public lastname: string,
    public firstname: string,
    public age: number
  ) {}
}
const users: User[] = [
  new User(0, 'mdp1', 'Doe', 'John', 23),
  new User(1, 'mdp2', 'Doe', 'Jane', 32)
]

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, HttpClientModule, NavComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const request: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
    lastValueFrom(request).then(response => this.dataSource = response.body);
  }
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource= [];

}
