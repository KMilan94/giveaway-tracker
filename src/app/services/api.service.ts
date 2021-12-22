import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Giveaway } from '../models/giveaway';
import { Worth } from '../models/worth';
import { EmptyResponse } from '../models/empty-response';
import { environment } from 'src/environments/environment';

// Api service, which responsible for fetching data from backend

export type SortType = 'date' | 'value' | 'popularity';
export type PlatformType = 'all' | 'pc' | 'steam' | 'epic-games-store' | 'ubisoft' | 'gog' | 'itchio' | 'ps4' | 'ps5'
  | 'xbox-one' | 'xbox-series-xs' | 'switch' | 'android' | 'ios' | 'vr' | 'battlenet' | 'origin' | 'drm-free' | 'xbox-360';
export type GameType = 'all' | 'game' | 'loot' | 'beta';
export type Order = 'descending' | 'ascending';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public giveaways$ = new BehaviorSubject<Giveaway[]>([]);
  public selectedPlatform: PlatformType = 'all';
  public selectedType: GameType = 'all';
  public selectedSort: SortType = 'date';

  public constructor(private http: HttpClient) {
    this.fetchGiveaways();
  }

  public fetchGiveaways(): void {
    const sortParam = `sort-by=${this.selectedSort}`;
    const platformParam = this.selectedPlatform === 'all' ? '' : `&platform=${this.selectedPlatform}`;
    const typeParam = this.selectedType === 'all' ? '' : `&type=${this.selectedType}`;

    this.http.get<Giveaway[]>(`https://gamerpower.p.rapidapi.com/api/giveaways?${sortParam}${platformParam}${typeParam}`, {
      headers: {
        'x-rapidapi-host': `${environment.host}`,
        'x-rapidapi-key': `${environment.key}`
      }
    }).subscribe((giveaways: Giveaway[] | EmptyResponse) => {
      const isEmpty = this.isResponseEmpty(giveaways);
      if (isEmpty) {
        this.giveaways$.next([]);
      }

      else {
        this.giveaways$.next(giveaways as Giveaway[]);
      }
    });
  }

  private isResponseEmpty(response: Giveaway[] | EmptyResponse): boolean {
    return response.hasOwnProperty('status') && response.hasOwnProperty('status_message') ? true : false;
  }

  public fetchWorth(): Observable<Worth> {

    const platformParam = this.selectedPlatform === 'all' ? '' : `platform=${this.selectedPlatform}`;
    const typeParam = this.selectedType === 'all' ? '' : `&type=${this.selectedType}`;

    return this.http.get<Worth>(`https://gamerpower.p.rapidapi.com/api/worth?${platformParam}${typeParam}`, {
      headers: {
        'x-rapidapi-host': `${environment.host}`,
        'x-rapidapi-key': `${environment.key}`
      }
    });
  }
}
