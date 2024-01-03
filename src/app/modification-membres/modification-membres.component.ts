import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {MatIconModule} from "@angular/material/icon";
import {NavComponent} from "../nav/nav.component";
import {KeyValuePipe, NgForOf, UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../users-page/users-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RoleValue} from "./role.enum";

@Component({
  selector: 'app-modification-membres',
  standalone: true,
  imports: [
    FooterComponent,
    MatIconModule,
    NavComponent,
    NgForOf,
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
    KeyValuePipe
  ],
  templateUrl: './modification-membres.component.html',
  styleUrl: './modification-membres.component.css'
})
export class ModificationMembresComponent implements OnInit {

  constructor(private router: Router, private api: ApiHelperService, private http: HttpClient, private route: ActivatedRoute) {}

  private assocId!:number;
  public members !: User[]; // membres
  public users !: User[];
  public selectedUser !:User;
  public selectedRole !: RoleValue;
  public membersToDeleteId : number[] = []; // id des membres qui ont été supprimés
  public newMembers : User[] = []; // utilisateurs qui viennent de devenir membre
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        if (id != null) {
          this.assocId = +id;
          this.api.get({endpoint : '/associations/' + id + '/members'}).then(response => {
            this.members = response;
            for (const member of this.members) {
              this.api.get({endpoint: '/roles/' + member.id + '/' + id}).then( response=> {
                // attribution du role du membre
                member.role = response.name;
              })
            }
          }).then(response => {
            const userRequest: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
            lastValueFrom(userRequest).then(response => this.users = response.body);
          }).then(response=>{
            console.log("MEMBERS" + JSON.stringify(this.members));
          })
        }
      })
    }
  validate(): void {
    console.log('ON VALIDE');
    // On met à jour les membres
    this.api.put({ endpoint: '/associations/'+ this.assocId,
      data: { idUsers: this.membersToId()}}).then(response => {
      this.router.navigateByUrl('/associations/'+this.assocId);
    })
    // On met à jour les rôles
    this.modifyRoles();
  };

  modifyRoles() {
    // mise à jour des rôles pour tous les anciens membres
    for (const member of this.members) {
      this.api.put({ endpoint: '/roles/'+ member.id + '/' + this.assocId,
        data: { name: member.role}}).then(response => {
        console.log(`role modifié pour l'utilisateur ${member.id} dans l'association ${this.assocId}`);
      })
    }
    // création des rôles pour tous les nouveaux membres
    for (const newMember of this.newMembers) {
      this.api.post({ endpoint: '/roles',
        data: { name: newMember.role, idUser : newMember.id, idAssociation : this.assocId}}).then(response => {
        console.log(`role créé pour l'utilisateur ${newMember.id} dans l'association ${this.assocId}`);
      })
    }
    for (let i = 0; i < this.membersToDeleteId.length; i++) { // suppression des rôles pour tous les nouveaux membres
      this.api.delete({ endpoint: '/roles/'+ this.membersToDeleteId[i] + '/' + this.assocId}).then(response => {
        console.log(`role supprimé pour l'utilisateur ${this.membersToDeleteId[i]} dans l'association ${this.assocId}`);
      })
    }
  }

  deleteMember(user:User): void{
    const i = this.members.indexOf(user);
    this.membersToDeleteId.push(this.members[i].id); // On ajoute l'utilisateur dans la liste de ceux à supprimer de l'association
    this.members.splice(i, 1);
    console.log("Deleting member:", user);
    console.log("MEMBERS" + JSON.stringify(this.members));
  }

  addMember(): void{
    const idPosition = this.members.findIndex(member => this.selectedUser.id === member.id);
    if((idPosition === -1)){ //on ne add que si le user selected n'est pas déjà membre
      this.selectedUser.role = RoleValue.M; // Valeur par défaut
      if (this.membersToDeleteId.indexOf(this.selectedUser.id) !== -1) {// l'utilisateur a été supprimé sans valider
        console.log("C'est un faux nouveau membre");
        this.members.push(this.selectedUser);
        // On l'enlève des utilisateurs à supprimer
        const indexToDelete = this.membersToDeleteId.indexOf(this.selectedUser.id);
        this.membersToDeleteId.splice(indexToDelete, 1);
      } else { // on ajoute un vrai nouveau membre
        this.newMembers.push(this.selectedUser);
        console.log('Adding member:', this.selectedUser);
      }
    }
  }
  private membersToId(): number[]{
    this.members = this.members.concat(this.newMembers);
    console.log("voilà la liste des membres à update");
    console.log(JSON.stringify(this.members));
    return this.members.map(member => member.id);
  }
  protected readonly RoleValue = RoleValue;
  protected readonly Object = Object;
}
