import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotGiveawaysComponent } from './hot-giveaways.component';

describe('HotGiveawaysComponent', () => {
  let component: HotGiveawaysComponent;
  let fixture: ComponentFixture<HotGiveawaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotGiveawaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotGiveawaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
