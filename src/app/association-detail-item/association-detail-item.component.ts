import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavComponent} from "../nav/nav.component";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {Association} from "../user-detail-item/user-detail-item.component";
import {User} from "../users-page/users-page.component";
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export class Minute {
  constructor(
    public id: number,
    public content: string,
    public date: string,
    public voters : User[],
    public association : Association
  ) {}
}
@Component({
  selector: 'app-association-detail-item',
  standalone: true,
  imports: [
    FooterComponent,
    NavComponent,
    NgForOf,
    NgIf,
    UpperCasePipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './association-detail-item.component.html',
  styleUrl: './association-detail-item.component.css'
})
export class AssociationDetailItemComponent implements OnInit{
  constructor(private route: ActivatedRoute,
              private api: ApiHelperService,
              private http:HttpClient,
  private router: Router
) {
  }
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        this.id = res.get("id");
        if (this.id != null) {
          const userRequest: Observable<any> = this.http.get('http://localhost:3000/associations/'+this.id, { observe: 'response' });
          lastValueFrom(userRequest).then(response => this.association = response.body);
          /*this.api.get({endpoint : '/associations/'+id}).then(response => {
            console.log(response);
            this.association = response;
          });*/
          this.api.get({endpoint : '/associations/' + this.id + '/members'}).then(response => {
            this.members = response;
            this.nbMembers = this.members.length;
            for (const member of this.members) {
              this.api.get({endpoint : '/roles/' + member.id + '/' + this.id}).then(response => {
                console.log(response.name);
                this.roles.set(member, response.name);
              });
            }
          });
          this.api.get({endpoint : '/minutes/association/' + this.id}).then(response => {
            this.minutes = response;
            this.nbMinutes = this.minutes.length;
          });
        }
      })
  }

  getRole(member:User) {
    return this.roles.get(member);
  }
  association!:Association;
  members: User[] = [];
  minutes: Minute[] = [];
  nbMinutes !: number;
  nbMembers !: number;
  id !: string | null;
  roles= new Map();

  delete():void{
    console.log('ON DELETE')
    this.api.delete({ endpoint: '/associations/'+ this.id,
      data: { id: this.id}}).then(response => {
      this.router.navigateByUrl('/associations');
    })
  }
}

export class Role {
  id !: number;
  association !: Association;
  user !: User;
  name !: string;

}
