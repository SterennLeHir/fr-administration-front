import { Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  {path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent }
];
