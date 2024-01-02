import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, UpperCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../users-list/users-list.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {TokenStorageService} from "../services/token-storage.service";
import {lastValueFrom, Observable} from "rxjs";

@Component({
  selector: 'app-creation-association',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    MatIconModule,
    NgForOf,
    ReactiveFormsModule,
    UpperCasePipe,
    RouterLinkActive,
    RouterLink,
    FormsModule
  ],
  templateUrl: './creation-association.component.html',
  styleUrl: './creation-association.component.css'
})
export class CreationAssociationComponent implements OnInit{
  private assocId!:number;
  public members! : User[]
  public users! : User[]
  public selectedUser! :User
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private api: ApiHelperService,
    private router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    const userRequest: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
    lastValueFrom(userRequest).then(response => this.users = response.body);
    this.members = []
  }

  validate(): void {
    console.log('ON CREE')
    const nom: string = (document.getElementById('nom') as HTMLInputElement).value;
    const description: string = (document.getElementById('description') as HTMLInputElement).value;
    const membersId: number[] = this.membersToId()
    this.api.post({ endpoint: '/associations',
      data: { name: nom, idUsers: membersId, description: description}}).then(response => {
      this.router.navigateByUrl('/associations');
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

  protected readonly JSON = JSON;

}
