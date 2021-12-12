
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ContentComponent } from './content.component';
import { ApiService } from 'src/app/services/api.service';
import { MaterialModule } from 'src/app/material.module';

describe('ContentComponent', () => {
    let component: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;
    // let apiService: ApiService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ContentComponent
            ],
            imports: [
                HttpClientTestingModule,
                MaterialModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [ApiService]
        }).compileComponents();
        // apiService = TestBed.inject(ApiService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
