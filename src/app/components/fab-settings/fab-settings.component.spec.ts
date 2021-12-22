import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { ContextService } from 'src/app/services/context.service';

import { FabSettingsComponent } from './fab-settings.component';

class MockContextService {
  public sidenavOpened$ = new BehaviorSubject<boolean>(false);
}

describe('FabSettingsComponent', () => {
  let component: FabSettingsComponent;
  let fixture: ComponentFixture<FabSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [FabSettingsComponent],
      providers: [
        { provide: ContextService, useClass: MockContextService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();0
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit false to sidenavOpened when fab button was pressed', () => {
    spyOn(component, 'setSidenavState');
    expect(component.sidenavOpened).toEqual(false);
    const fab = fixture.nativeElement.querySelector('.fab-settings');
    fab.click();
    fixture.detectChanges();
    expect(component.setSidenavState).toHaveBeenCalledOnceWith(true);
  })
});
