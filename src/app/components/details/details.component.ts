import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Giveaway } from 'src/app/models/giveaway';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  public giveaway: Giveaway | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.giveaway = this.apiService.getGiveawayById(Number(id));
    console.log('giveaway: ', this.giveaway);
   }
}
