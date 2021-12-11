import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { Giveaway } from 'src/app/models/giveaway';
import { ApiService } from 'src/app/services/api.service';
import { SwiperModule } from 'swiper/angular';
import { BannerComponent } from './banner.component';
import { mockGiveaways } from '../../data/giveaways';

class MockApiService {
  public giveaways$ = new BehaviorSubject<Giveaway[] | null>(null);
}

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [ 
        HttpClientTestingModule,
        SwiperModule
       ],
       providers: [
         { provide: ApiService, useClass: MockApiService } 
       ]
    })
    .compileComponents();
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

  it('should generate banner items when giveaways emitted', () => {
    const giveaways: Giveaway[] = [...mockGiveaways];
    spyOn(component, 'createBannerItems');
    fixture.detectChanges();
    apiService.giveaways$.next(giveaways);
    fixture.detectChanges();
    expect(component.createBannerItems).toHaveBeenCalledOnceWith(giveaways);
  });
});
