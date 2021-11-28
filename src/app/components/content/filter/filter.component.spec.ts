
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { FilterComponent } from './filter.component';
import { ApiService } from 'src/app/services/api.service';
import { MaterialModule } from 'src/app/material.module';

describe('FilterComponent', () => {
    let component: FilterComponent;
    let fixture: ComponentFixture<FilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ 
                FilterComponent 
            ],
            providers: [ 
                ApiService
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
});
