import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {ApiHelperService} from "../services/api-helper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../services/token-storage.service";
import {User} from "../users-list/users-list.component";
import {NgForOf, UpperCasePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-modification-association',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    NgForOf,
    UpperCasePipe,
    MatIconModule
  ],
  templateUrl: './modification-association.component.html',
  styleUrl: './modification-association.component.css'
})

export class ModificationAssociationComponent {
  private assocId!:number;
  public members! : User[]
  public users! : User[]
  constructor(
    private route: ActivatedRoute,
    private api: ApiHelperService,
    private router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        if (id != null) {
          this.assocId = +id
          this.api.get({endpoint : '/associations/' + id + '/members'}).then(response => {
            this.members = response;
          });
          this.api.get({endpoint : '/users'}).then(response => {
            this.users = response
            console.log('Les users : ' + this.users)
          });
        }
      })
  }

  validate(): void {
    const nom: string = (document.getElementById('nom') as HTMLInputElement).value;
    const description: string = (document.getElementById('description') as HTMLInputElement).value;
    this.api.put({ endpoint: '/associations/'+ this.assocId,
      data: { name: nom, users: [], description: description}}).then(response => {
      this.router.navigateByUrl('/associations/'+this.assocId);
    })
  };

  deleteMember(user:User): void{
    const i = this.members.indexOf(user)
    this.members.splice(i, 1)
    //console.log("Suppression du membre")
  }

  addMember(event:any): void{
    const user = event.target.value;
    const userString = JSON.parse(user);
    //console.log('Adding member:', user);
    //this.members.push(user)
  }

  /*private membersToId(): any{
    const t = []
    for(member of this.members){
      t.push(member.id)
    }
  }
  */
  protected readonly JSON = JSON;
}
