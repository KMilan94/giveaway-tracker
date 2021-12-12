import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Id: ', this.id);
  }

  public ngOnInit(): void {
    this.subscriptions = [
      this.apiService.getGiveawayById(this.id).subscribe((giveaway: Giveaway) => {
        console.log('asd: ', giveaway);
        this.giveaway = giveaway;
      }, (err) => {
        console.error(err);
      })
    ]
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
