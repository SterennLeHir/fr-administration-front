import { Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {LoginComponent} from "./login/login.component";
import {authGuard} from './guards/auth.guard'
import {AssociationsListComponent} from "./associations-list/associations-list.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  {path: 'users', component: UsersListComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent },
  {path: 'associations', component:AssociationsListComponent},
  {path: 'home', component:HomeComponent, canActivate:[authGuard]}
];
