import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-fab-settings',
  templateUrl: './fab-settings.component.html',
  styleUrls: ['./fab-settings.component.scss']
})
export class FabSettingsComponent implements OnInit, OnDestroy {
  public sidenavOpened = false;
  private subscriptions: Subscription[];

  public constructor(private contextService: ContextService) { }

  public ngOnInit(): void {
    this.subscriptions = [
      this.contextService.sidenavOpened$.subscribe((sidenavOpened: boolean) => {
        this.sidenavOpened = sidenavOpened;
      })
    ];
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public setSidenavState(state: boolean): void {
    this.contextService.sidenavOpened$.next(state);
  }
}
