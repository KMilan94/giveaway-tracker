import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Giveaway } from './models/giveaway';
import { ApiService } from './services/api.service';
import { ContextService } from './services/context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public sidenavOpened = false;
  public giveAways!: Giveaway[];
  private subscriptions!: Subscription[];

  public constructor(private contextService: ContextService, private apiService: ApiService) { }

  public ngOnInit(): void {
    this.subscriptions = [
      this.contextService.sidenavOpened$.subscribe((sidenavOpened: boolean) => {
        this.sidenavOpened = sidenavOpened;
      }),
      this.apiService.giveaways$.subscribe((giveaways: Giveaway[]) => {
        this.giveAways = giveaways;
      })
    ];
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public setSidenavState(state: boolean): void {
    if (state === false) {
      this.contextService.sidenavOpened$.next(state);
    }
  }
}
