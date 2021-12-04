import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-empty-list-item',
  templateUrl: './empty-list-item.component.html',
  styleUrls: ['./empty-list-item.component.scss']
})
export class EmptyListItemComponent {

  public constructor (private apiService: ApiService) { }

  public constructErrorMessage(): string {
    return `No active giveaway available with these conditions: type=${this.apiService.selectedType}, 
      platform=${this.apiService.selectedPlatform}. Try with different filters.`;
  }
}
