import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { skip, Subscription, take } from 'rxjs';

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

export interface HotGiveaway {
  id: number;
  name: string;
  url: string;
  selected: boolean;
}

export const SM_BREAKPOINT = 959; // breakpoint indicating the supremum of sm

@Component({
  selector: 'app-hot-giveaways',
  templateUrl: './hot-giveaways.component.html',
  styleUrls: ['./hot-giveaways.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HotGiveawaysComponent implements OnInit, OnDestroy {

  /**
 * Breakpoints and Orientation provided 
 * via the 'layout' cdk.
 */
  public viewportSizes = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ];

    /**
   * Our local boolean variables to
   * declare is we are within certain
   * breakpoints.
   */
     public isXSmall!: boolean;
     public isSmall!: boolean;
     public isMedium!: boolean;
     public isLarge!: boolean;
     public isXLarge!: boolean;
    

  public hotGiveaways!: HotGiveaway[];
  public slidesPerGroup = 2;
  public slidesPerView = 2;
  public swiperWidth = 600; // in px
  private subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService, private breakpointObserver: BreakpointObserver) { }

  public ngOnInit(): void {
    this.subscriptions = [
      this.apiService.giveaways$.pipe(
        skip(1), // skip initial value
        take(1)) // subscribe only to the relevance related fetch
        .subscribe((giveaways: Giveaway[]) => {
          this.hotGiveaways = this.formatGiveaways([...giveaways]);
        }),
        this.breakpointObserver.observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
          Breakpoints.XLarge,
        ]).subscribe(() => {
          this.isXSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);
          this.isSmall = this.breakpointObserver.isMatched(Breakpoints.Small);
          this.isMedium = this.breakpointObserver.isMatched(Breakpoints.Medium);
          this.isLarge = this.breakpointObserver.isMatched(Breakpoints.Large);
          this.isXLarge = this.breakpointObserver.isMatched(Breakpoints.XLarge);
          this.setSwiperConfig();
          // console.log('small: ', this.isXSmall, this.isSmall, this.isMedium, this.isLarge, this.isLarge, this.isXLarge, state);
        })
    ]
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public formatGiveaways(giveaway: Giveaway[]): HotGiveaway[] {
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

  public setSwiperConfig(): void {
    console.log('Breakpoints: ',  this.viewportSizes);
    if(this.isXSmall) {
      this.slidesPerGroup = 1;
      this.slidesPerView = 1;
      this.swiperWidth = 580;
    }
    if(this.isSmall) {
      this.slidesPerView = 2;
      this.slidesPerGroup = 2;
      this.swiperWidth = 940;
    }
    if(this.isMedium) {
      this.slidesPerGroup = 3;
      this.slidesPerView = 3;
      this.swiperWidth = 1260;
    }
    if(this.isLarge || this.isXLarge) {
      this.slidesPerGroup = 4;
      this.slidesPerView = 4;
      this.swiperWidth = 1900;
    }
  }
}
