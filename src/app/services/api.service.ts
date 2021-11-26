import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Giveaway } from '../models/giveaway';

export type SortType = 'none' | 'date' | 'value' | 'popularity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public giveaways$ = new BehaviorSubject<Giveaway[]>([]);
  public selectedSort: SortType = 'popularity';

  public constructor(private http: HttpClient) {
    this.fetchGiveaways();
  }

  public fetchGiveaways(): void {
    this.http.get<Giveaway[]>(`https://gamerpower.p.rapidapi.com/api/giveaways?sort-by=${this.selectedSort}`, {
      headers: {
        'x-rapidapi-host': 'gamerpower.p.rapidapi.com',
        'x-rapidapi-key': 'e675b0c6damsh1d075ad3910cd0bp19c1e9jsn8a402ca06cc0'
      }
    }).subscribe((giveAways: Giveaway[]) => {
      this.giveaways$.next(giveAways);
    });
  }
}
