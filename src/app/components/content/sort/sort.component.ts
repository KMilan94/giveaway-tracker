import { Component, Input } from '@angular/core';
import { Giveaway } from 'src/app/models/giveaway';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {

  @Input() public giveaways!: Giveaway[];

  public selectedSort = 'none';
  public sortOptions: {[key: string]: string} = {
    'none': 'None',
    'date': 'Date',
    'value': 'Value',
    'popularity': 'Popularity'
  }

  public setSort(sortType: string): void {
    this.selectedSort = sortType;
  }
}
