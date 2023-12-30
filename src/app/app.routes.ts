import { Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {LoginComponent} from "./login/login.component";
import {authGuard} from './guards/auth.guard'
import {AssociationsListComponent} from "./associations-list/associations-list.component";
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from "./account/account.component";
import {UserDetailItemComponent} from "./user-detail-item/user-detail-item.component";
import {ModificationInfosComponent} from "./modification-infos/modification-infos.component";

export const routes: Routes = [
  {path: 'users', component: UsersListComponent, canActivate:[authGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'associations', component:AssociationsListComponent, canActivate:[authGuard]},
  {path: 'home', component:HomeComponent, canActivate:[authGuard]},
  {path: 'account', component:AccountComponent},
  {path: 'users/:id', component:UserDetailItemComponent},
  {path: 'modifier-mes-informations', component:ModificationInfosComponent}
];
