import { Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {LoginComponent} from "./login/login.component";
import {authGuard} from './guards/auth.guard'
import {AssociationsListComponent} from "./associations-list/associations-list.component";
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from "./account/account.component";
import {UserDetailItemComponent} from "./user-detail-item/user-detail-item.component";
import {ModificationInfosComponent} from "./modification-infos/modification-infos.component";
import {RegisterComponent} from "./register/register.component";
import {AssociationDetailItemComponent, Minute} from "./association-detail-item/association-detail-item.component";
import {ModificationAssociationComponent} from "./modification-association/modification-association.component";
import {ModificationPasswordComponent} from "./modification-password/modification-password.component";

export const routes: Routes = [
  {path: 'users', component: UsersListComponent, canActivate:[authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'associations', component:AssociationsListComponent, canActivate:[authGuard]},
  {path: 'home', component:HomeComponent, canActivate:[authGuard]},
  {path: 'account', component:AccountComponent, canActivate:[authGuard]},
  {path: 'users/:id', component:UserDetailItemComponent, canActivate:[authGuard]},
  {path: 'associations/:id', component:AssociationDetailItemComponent, canActivate:[authGuard]},
  {path: 'minute/:id', component: Minute, canActivate: [authGuard]},
  {path: 'modifier-mes-informations', component:ModificationInfosComponent, canActivate:[authGuard]},
  {path: 'modifier-association/:id', component:ModificationAssociationComponent, canActivate:[authGuard]},
  {path: 'modifier-mot-de-passe', component:ModificationPasswordComponent, canActivate:[authGuard]},
  {path: '', component: LoginComponent},
  {path: '*', component: LoginComponent},

];
