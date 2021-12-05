import { Component, OnDestroy, OnInit } from '@angular/core';
import { skip, Subscription, take } from 'rxjs';
import { Giveaway } from 'src/app/models/giveaway';
import { ApiService } from 'src/app/services/api.service';

export interface HotGiveaway {
  id: number;
  name: string;
  url: string;
  selected: boolean;
}

@Component({
  selector: 'app-hot-giveaways',
  templateUrl: './hot-giveaways.component.html',
  styleUrls: ['./hot-giveaways.component.scss']
})
export class HotGiveawaysComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public hotGiveaways!: HotGiveaway[];

  constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    this.subscriptions = [
      this.apiService.giveaways$.pipe(
        skip(1), // skip initial value
        take(1)) // subscribe only to the relevance related fetch
        .subscribe((giveaways: Giveaway[]) => {
          this.hotGiveaways = this.formatGiveaways(giveaways);
          console.log('Result: ', this.hotGiveaways);
        })
    ]
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public formatGiveaways(giveaway: Giveaway[]): HotGiveaway[] {
    const hotGiveaways: Giveaway[] = giveaway.splice(0, 3);
    return hotGiveaways.map((giveaway: Giveaway) => {
      return {
        id: giveaway.id,
        url: giveaway.image,
        name: giveaway.title,
        selected: false
      }
    });
  }

  public expandGiveaway(giveaway: HotGiveaway): void {
    this.hotGiveaways.forEach((current: HotGiveaway) => {
      current.selected = current.id === giveaway.id ? !giveaway.selected : false;
    });
  }

  public getGridStyle(): Record<string, string> {
    let templateColumns = '';

    // process banner
    templateColumns += this.hotGiveaways.some((giveaway: HotGiveaway) => giveaway.selected) ? '2fr ' : '4fr ';

    // process giveaways
    this.hotGiveaways.forEach((giveaway: HotGiveaway) => {
      templateColumns += giveaway.selected ? '2fr ' : '1fr ';
    });

    console.log('Result: ', templateColumns);

    return {
      'grid-template-columns': templateColumns
    };
  }

  public resetStyle(): void {
    this.hotGiveaways.forEach((giveaway: HotGiveaway) => {
      giveaway.selected = false;
    })
  }

  public someGiveawaySelected(): boolean {
    return this.hotGiveaways.some((giveaway: HotGiveaway) => giveaway.selected);
  }

  public generateBannerText(): string {
    const d = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `Latest deals of ${monthNames[d.getMonth()]}`
  }
}
