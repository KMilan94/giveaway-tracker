
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { FilterComponent } from './filter.component';
import { ApiService } from 'src/app/services/api.service';
import { MaterialModule } from 'src/app/material.module';
import { mockGiveaways } from 'src/app/data/giveaways';

class MockApiService {
    public selectedType = 'loot';
    public selectedPlatform = 'ubisoft';
}

describe('FilterComponent', () => {
    let component: FilterComponent;
    let fixture: ComponentFixture<FilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ 
                FilterComponent 
            ],
            providers: [ 
                { provide: ApiService, useClass: MockApiService }
            ],
            imports: [
                HttpClientTestingModule, 
                MaterialModule,
                FormsModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle platform when show hide button was pressed', () => {
        component.giveaways = [...mockGiveaways];
        fixture.detectChanges();
    });
});
