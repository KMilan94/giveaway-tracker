import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';
import { ApiService } from 'src/app/services/api.service';
import { EmptyListItemComponent } from './empty-list-item.component';

describe('EmptyListItemComponent', () => {
    let component: EmptyListItemComponent;
    let fixture: ComponentFixture<EmptyListItemComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ 
            EmptyListItemComponent 
        ],
        providers: [ 
           ApiService
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
