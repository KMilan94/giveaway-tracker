import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { SwiperModule } from 'swiper/angular';

import { Giveaway } from 'src/app/models/giveaway';
import { ApiService } from 'src/app/services/api.service';
import { BannerComponent, SHOW_DELAY } from './banner.component';
import { mockGiveaways } from '../../data/giveaways';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';

class MockApiService {
  public giveaways$ = new BehaviorSubject<Giveaway[] | null>(null);
}

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerComponent],
      imports: [
        HttpClientTestingModule,
        SwiperModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate banner items when giveaways emitted', fakeAsync(() => {
    spyOn(component, 'createBannerItems');
    apiService.giveaways$.next([]);
    tick(SHOW_DELAY);
    const giveaways: Giveaway[] = [...mockGiveaways];
    apiService.giveaways$.next(giveaways);
    tick(SHOW_DELAY);
    expect(component.createBannerItems).toHaveBeenCalledOnceWith(giveaways);
  }));
});
