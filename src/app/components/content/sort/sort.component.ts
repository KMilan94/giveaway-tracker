import { Component, Input } from '@angular/core';
import { Giveaway } from 'src/app/models/giveaway';
import { ApiService, SortType } from 'src/app/services/api.service';

import { sortOptions } from 'src/app/data/sort-options';

export type SortModel = {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {

  @Input() public giveaways!: Giveaway[];

  public selectedSort = this.apiService.selectedSort;
  public sortOptions: { [key: string]: SortModel } = { ...sortOptions };

  public constructor(private apiService: ApiService) { }

  public setSort(sortType: string): void {
    if (sortType != this.selectedSort) {
      this.selectedSort = this.apiService.selectedSort = sortType as SortType;
      this.apiService.fetchGiveaways();
    }
  }
}
