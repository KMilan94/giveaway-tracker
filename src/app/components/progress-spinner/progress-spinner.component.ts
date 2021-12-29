import { AfterViewInit, Component, Input, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { delayWhen, interval, of, Subscription } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { ApiService } from 'src/app/services/api.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

export const SPINNER_DELAY = 1000;

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnDestroy, AfterViewInit {
  @Input() diameter = 100;
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('progressSpinnerRef') private progressSpinnerRef: TemplateRef<any>;
  private overlayRef: OverlayRef;
  private subscriptions: Subscription[] = [];

  public constructor(private apiService: ApiService, private overlayService: Overlay, private vcRef: ViewContainerRef) { }

  public ngAfterViewInit(): void {
    this.overlayRef = this.overlayService.create({
      hasBackdrop: true,
      positionStrategy: this.overlayService.position().global().centerHorizontally().centerVertically()
    });

    this.subscriptions = [
      this.apiService.loading$.pipe(
        delayWhen(loading => !loading ? interval(1000) : of(undefined))
      ).subscribe((loading) => {
        this.toggleSpinner(loading);
      })
    ]
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public toggleSpinner(loading: boolean): void {
    if (loading && !this.overlayRef.hasAttached()) {
      const templatePortal = new TemplatePortal(this.progressSpinnerRef, this.vcRef);
      this.overlayRef.attach(templatePortal);
    }

    if (!loading && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
