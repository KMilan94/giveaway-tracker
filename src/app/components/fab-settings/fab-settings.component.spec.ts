import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabSettingsComponent } from './fab-settings.component';

describe('FabSettingsComponent', () => {
  let component: FabSettingsComponent;
  let fixture: ComponentFixture<FabSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FabSettingsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
