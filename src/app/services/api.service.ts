import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Giveaway } from '../models/giveaway';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public constructor(private http: HttpClient) { }

  public getGiveaways(): Observable<Giveaway[]> {
    return this.http.get<Giveaway[]>('https://gamerpower.p.rapidapi.com/api/giveaways', {
      headers: {
        'x-rapidapi-host': 'gamerpower.p.rapidapi.com',
        'x-rapidapi-key': 'e675b0c6damsh1d075ad3910cd0bp19c1e9jsn8a402ca06cc0'
      }
    });
  }
}
