import { Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {LoginComponent} from "./login/login.component";
import {authGuard} from './guards/auth.guard'

export const routes: Routes = [
  { path: 'users', component: UsersListComponent, canActivate: [authGuard] },
  {path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent }
];
