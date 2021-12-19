import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { getColorFromGameType } from 'src/app/data/rarity-colors';

import { Giveaway } from 'src/app/models/giveaway';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public id: number;
  public giveaway: Giveaway | undefined;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGiveaway();
  }

  public ngOnInit(): void {
    this.subscriptions = [
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ).subscribe((event: any) => {
        if (event.url.match(/\/details\/+/g)) {
          this.id = Number(event.url.split('/').pop());
          this.loadGiveaway();
        }
      })
    ]
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public getBackgroundColor(giveType: string): Record<string, string> {
    return {
      'background-color': getColorFromGameType(giveType)
    };
  }

  public loadGiveaway(): void {
    this.subscriptions.push(
      this.apiService.getGiveawayById(this.id).subscribe((giveaway: Giveaway) => {
        this.giveaway = giveaway;
      }, (err) => {
        console.error(err);
      })
    )
  }
}
