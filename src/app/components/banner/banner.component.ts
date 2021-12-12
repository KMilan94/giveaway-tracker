import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { delay, skip, Subscription, take } from 'rxjs';

import { Giveaway } from 'src/app/models/giveaway';
import { ApiService } from 'src/app/services/api.service';

// import Swiper core and required modules
import SwiperCore, {
  Keyboard,
  Scrollbar,
  Navigation,
  Pagination,
  Autoplay
} from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, Keyboard, Scrollbar, Navigation, Pagination]);

export interface BannerItem {
  id: number;
  name: string;
  url: string;
  selected: boolean;
}

export const SHOW_DELAY = 1000;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent implements OnInit, OnDestroy {

  public bannerItems!: BannerItem[];
  private subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    this.subscriptions = [
      this.apiService.giveaways$.pipe(
        delay(SHOW_DELAY),
        skip(1), // skip initial value
        take(1)) // subscribe only to the relevance related fetch
        .subscribe((giveaways: Giveaway[]) => {
          this.bannerItems = this.createBannerItems([...giveaways]);
        })
    ];
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public createBannerItems(giveaway: Giveaway[]): BannerItem[] {
    const hotGiveaways: Giveaway[] = giveaway.splice(0, 8);
    return hotGiveaways.map((giveaway: Giveaway) => {
      return {
        id: giveaway.id,
        url: giveaway.image,
        name: giveaway.title,
        selected: false
      }
    });
  }
}
