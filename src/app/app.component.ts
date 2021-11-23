import { Component } from '@angular/core';
import { Giveaway } from './models/giveaway';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public giveAways!: Giveaway[];
  displayedColumns: string[] = ['description', 'status', 'title'];
  
  public constructor(private apiService: ApiService) {
    this.apiService.getGiveaways().subscribe((giveAways: Giveaway[]) => {
      console.log('Result: ', giveAways);
      this.giveAways = giveAways;
    })
  }
}
