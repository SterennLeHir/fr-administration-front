import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavComponent} from "../nav/nav.component";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {Association} from "../user-detail-item/user-detail-item.component";
import {User} from "../users-list/users-list.component";

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
    RouterLink
  ],
  templateUrl: './association-detail-item.component.html',
  styleUrl: './association-detail-item.component.css'
})
export class AssociationDetailItemComponent implements OnInit{
  constructor(private route: ActivatedRoute, private api: ApiHelperService) {
  }
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        if (id != null) {
          this.api.get({endpoint : '/associations/'+id}).then(response => {
            console.log(response);
            this.association = response;
          });
          this.api.get({endpoint : '/associations/' + id + '/members'}).then(response => {
            this.members = response;
          });
          this.api.get({endpoint : '/minutes/association/' + id}).then(response => {
            this.minutes = response;
          });
        }
      })
  }

  association!:Association;
  members: User[] = [];
  minutes: Minute[] = [];
}
