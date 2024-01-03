import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {Minute} from "../association-detail-item/association-detail-item.component";
import {FooterComponent} from "../footer/footer.component";
import {NavComponent} from "../nav/nav.component";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {User} from "../users-page/users-page.component";

@Component({
  selector: 'app-minute',
  standalone: true,
  imports: [
    FooterComponent,
    NavComponent,
    NgForOf,
    NgIf,
    UpperCasePipe
  ],
  templateUrl: './minute.component.html',
  styleUrl: './minute.component.css'
})
export class MinuteComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiHelperService){}

  ngOnInit(): void {
  console.log(this.route.paramMap);
    this.route.paramMap
      .subscribe(res => {
        const id = res.get("id");
        if (id != null) {
          this.api.get({endpoint : '/minutes/'+id}).then(response => {
            console.log(response);
            this.minute = response;
            this.voters = this.minute.voters;
          });
        }
      })
    }

  minute !: Minute
  voters!: User[]
}
