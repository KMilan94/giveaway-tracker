import { Component } from '@angular/core';
import { Giveaway } from '../../models/giveaway';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  public giveAways!: Giveaway[];
  
  public constructor(private apiService: ApiService) {
    this.apiService.getGiveaways().subscribe((giveAways: Giveaway[]) => {
      console.log('Giveaways: ', giveAways);
      this.giveAways = giveAways;
    })
  }
}
