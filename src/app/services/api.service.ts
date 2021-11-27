import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Giveaway } from '../models/giveaway';

export type SortType = 'date' | 'value' | 'popularity';
export type PlatformType = 'all' | 'pc' | 'steam' | 'epic-games-store' | 'ubisoft' | 'gog' | 'itchio' | 'ps4' | 'ps5'
  | 'xbox-one' | 'xbox-series-xs' | 'switch' | 'android' | 'ios' | 'vr' | 'battlenet' | 'origin' | 'drm-free' | 'xbox-360';
export type GameType = 'all' | 'game' | 'loot' | 'beta';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public giveaways$ = new BehaviorSubject<Giveaway[]>([]);

  public selectedPlatform: PlatformType = 'all';
  public selectedType: GameType = 'all';
  public selectedSort: SortType = 'popularity';

  public constructor(private http: HttpClient) {
    this.fetchGiveaways();
  }

  public fetchGiveaways(): void {
    const sortParam = `sort-by=${this.selectedSort}`;
    const platformParam = this.selectedPlatform === 'all' ? '' : `platform=${this.selectedPlatform}`;
    const typeParam = this.selectedType === 'all' ? '' : `type=${this.selectedType}`;

    this.http.get<Giveaway[]>(`https://gamerpower.p.rapidapi.com/api/giveaways?${sortParam}&${platformParam}&${typeParam}`, {
      headers: {
        'x-rapidapi-host': 'gamerpower.p.rapidapi.com',
        'x-rapidapi-key': 'e675b0c6damsh1d075ad3910cd0bp19c1e9jsn8a402ca06cc0'
      }
    }).subscribe((giveAways: Giveaway[]) => {
      this.giveaways$.next(giveAways);
    });
  }

  public getGiveawayById(id: number): Giveaway | undefined {
    const giveAways = this.giveaways$.value;
    return giveAways.find((giveaway: Giveaway) => {
      return giveaway.id === id
    });
  }
}
