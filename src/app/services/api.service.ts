import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  public constructor(private http: HttpClient) { }

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

  public getGiveawayById(id: number): Observable<Giveaway> {

    // check it is already loaded
    const giveaway = this.giveaways$.value.find((giveaway: Giveaway) => giveaway.id === id);
    if (giveaway) {
        return of(giveaway);
    }

    return this.http.get<Giveaway>(`https://gamerpower.p.rapidapi.com/api/giveaway?id=${id}`, {
      headers: {
        'x-rapidapi-host': 'gamerpower.p.rapidapi.com',
        'x-rapidapi-key': 'e675b0c6damsh1d075ad3910cd0bp19c1e9jsn8a402ca06cc0'
      }
    });
  }
}
