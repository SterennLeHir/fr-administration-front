import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {MatIconModule} from "@angular/material/icon";
import {NavComponent} from "../nav/nav.component";
import {NgForOf, UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../users-page/users-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

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
    FormsModule
  ],
  templateUrl: './modification-membres.component.html',
  styleUrl: './modification-membres.component.css'
})
export class ModificationMembresComponent implements OnInit {

  constructor(private router: Router, private api: ApiHelperService, private http: HttpClient, private route: ActivatedRoute) {
  }


  private assocId!:number;
  public members !: User[]
  public users !: User[]
  public selectedUser! :User
  public roles = new Map();
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        if (id != null) {
          this.assocId = +id;
          this.api.get({endpoint : '/associations/' + id + '/members'}).then(response => {
            this.members = response;
            for (const member of this.members) {
              this.api.get({endpoint: '/roles/' + member.id + '/' + id}).then(response => {
                this.roles.set(member, response.name);
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
    const membersId: number[] = this.membersToId()
    this.api.put({ endpoint: '/associations/'+ this.assocId,
      data: { idUsers: membersId}}).then(response => {
      this.router.navigateByUrl('/associations/'+this.assocId);
    })
  };

  deleteMember(user:User): void{
    const i = this.members.indexOf(user)
    this.members.splice(i, 1)
    console.log("Deleting member:", user)
    console.log("MEMBERS" + JSON.stringify(this.members))
  }

  addMember(): void{
    if((this.members.findIndex(member => this.selectedUser.id === member.id) === -1)){ //on ne add que si le user selected n'est pas déjà membre
      this.members.push(this.selectedUser)
      console.log('Adding member:', this.selectedUser);
      console.log("MEMBERS" + JSON.stringify(this.members))
    }
  }

  private membersToId(): number[]{
    return this.members.map(member => member.id)
  }
}
