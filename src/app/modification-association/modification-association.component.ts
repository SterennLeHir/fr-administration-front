import {Component, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {ApiHelperService} from "../services/api-helper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../services/token-storage.service";
import {User} from "../users-page/users-page.component";
import {NgForOf, UpperCasePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {response} from "express";

@Component({
  selector: 'app-modification-association',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    NgForOf,
    UpperCasePipe,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './modification-association.component.html',
  styleUrl: './modification-association.component.css'
})

export class ModificationAssociationComponent implements OnInit{
  private assocId!:number;
  public members! : User[]
  public users! : User[]
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private api: ApiHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        if (id != null) {
          this.assocId = +id
          this.api.get({endpoint : '/associations/' + id + '/members'}).then(response => {
            this.members = response
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
    const nom: string = (document.getElementById('nom') as HTMLInputElement).value;
    const description: string = (document.getElementById('description') as HTMLInputElement).value;
    this.api.put({ endpoint: '/associations/'+ this.assocId,
      data: { name: nom, description: description}}).then(response => {
      this.router.navigateByUrl('/associations/'+this.assocId);
    })
  };

  protected readonly JSON = JSON;
}
