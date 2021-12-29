import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { MaterialModule } from 'src/app/material.module';
import { ApiService } from 'src/app/services/api.service';
import { ProgressSpinnerComponent, SPINNER_DELAY } from './progress-spinner.component';

class MockApiService {
  public loading$ = new BehaviorSubject<boolean>(false);
}

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProgressSpinnerComponent
      ],
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle spinner when loading emitted', fakeAsync(() => {
    const toggleSpy = spyOn(component, 'toggleSpinner');
    apiService.loading$.next(true);
    fixture.detectChanges();
    expect(toggleSpy).toHaveBeenCalledOnceWith(true);
    toggleSpy.calls.reset();
    apiService.loading$.next(false);
    tick(SPINNER_DELAY);
    fixture.detectChanges();
    expect(toggleSpy).toHaveBeenCalledOnceWith(false);
  }));
});
