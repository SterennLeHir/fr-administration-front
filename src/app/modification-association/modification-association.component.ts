import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {FooterComponent} from "../footer/footer.component";
import {ApiHelperService} from "../services/api-helper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-modification-association',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent
  ],
  templateUrl: './modification-association.component.html',
  styleUrl: './modification-association.component.css'
})

export class ModificationAssociationComponent {
  private assocId!:number;
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
          this.assocId= +id;
        }
      })
  }
  validate(): void {
    const nom: string = (document.getElementById('nom') as HTMLInputElement).value;
    const description: string = (document.getElementById('description') as HTMLInputElement).value;
    this.api.put({ endpoint: '/associations/'+ this.assocId, data: { name: nom, users: [], description: description}}).then(response => {
      this.router.navigateByUrl('/associations/'+this.assocId);
    })
  };
}
