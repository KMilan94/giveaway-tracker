import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabScrollToTopComponent } from './fab-scroll-to-top.component';
import { MaterialModule } from 'src/app/material.module';

describe('FabScrollToTopComponent', () => {
  let component: FabScrollToTopComponent;
  let fixture: ComponentFixture<FabScrollToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FabScrollToTopComponent
      ],
      imports: [
        MaterialModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabScrollToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to top when button was pressed', () => {
    spyOn(component, 'scrollToTop');
    const fab = fixture.nativeElement.querySelector('.fab-settings');
    fab.click();
    fixture.detectChanges();
    expect(component.scrollToTop).toHaveBeenCalled();
  });
});
