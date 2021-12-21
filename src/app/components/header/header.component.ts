import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Worth } from '../../models/worth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public worth!: Worth;
  public languages: string[] = ['english', 'hungarian'];
  public currentLanguage = 'english';
  private subscriptions: Subscription[] = [];

  public constructor(private router: Router, private apiService: ApiService) { }

  public ngOnInit(): void {
    this.subscriptions = [
      this.apiService.giveaways$.pipe(
        switchMap(() => {
          return this.apiService.fetchWorth()
        }), distinctUntilChanged()).subscribe((worth: Worth) => {
          this.worth = {
            active_giveaways_number: worth.active_giveaways_number ? worth.active_giveaways_number : 0,
            worth_estimation_usd: worth.worth_estimation_usd ? worth.worth_estimation_usd : '0'
          };
        })
    ]
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public generateStatusMessage(): string {
    if (!this.worth) {
      return 'Loading..';
    }

    return `We found ${this.worth.worth_estimation_usd}$ worth of loot, ${this.worth.active_giveaways_number} active giveaways with the current conditions`;
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
}
