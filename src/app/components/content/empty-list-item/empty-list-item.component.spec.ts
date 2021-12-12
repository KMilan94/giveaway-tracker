import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';
import { ApiService } from 'src/app/services/api.service';
import { EmptyListItemComponent } from './empty-list-item.component';

class MockApiService {
  public selectedType = 'loot';
  public selectedPlatform = 'ubisoft';
}

describe('EmptyListItemComponent', () => {
  let component: EmptyListItemComponent;
  let fixture: ComponentFixture<EmptyListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EmptyListItemComponent
      ],
      providers: [
        { provide: ApiService, useClass: MockApiService }
      ],
      imports: [
        HttpClientTestingModule,
        MaterialModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should construct message from api service', () => {
    const message = fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(message.innerHTML).toEqual(`No active giveaway available with these conditions: type=loot, 
      platform=ubisoft. Try with different filters.`);
  })
});
