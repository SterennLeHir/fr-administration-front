import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {NgIf, UpperCasePipe} from "@angular/common";
import {ApiHelperService} from "../services/api-helper.service";
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-user-detail-item',
  standalone: true,
  imports: [
    UpperCasePipe,
    NgIf,
    NavComponent,
    FooterComponent
  ],
  templateUrl: './user-detail-item.component.html',
  styleUrl: './user-detail-item.component.css'
})
export class UserDetailItemComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private api: ApiHelperService) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(res => {
        console.log(res);
        const id = res.get("id");
        if (id != null) {
          console.log('http://localhost:3000/users/' + id)
          this.api.get({endpoint : '/users/'+id}).then(response => this.user = response);
        }
      })
  }

  @Input() user!:any
}
