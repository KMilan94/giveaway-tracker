import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Giveaway } from '../../models/giveaway';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  public giveAways!: Giveaway[];
  private subscriptions: Subscription[] = [];

  public constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    this.subscriptions = [
      this.apiService.giveaways$.subscribe((giveaways: Giveaway[]) => {
        this.giveAways = giveaways;
      })
    ]
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
