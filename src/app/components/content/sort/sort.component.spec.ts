
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SortComponent } from './sort.component';
import { ApiService } from 'src/app/services/api.service';
import { MaterialModule } from 'src/app/material.module';

class MockApiService {
    public selectedSort = 'date';
}

describe('SortComponent', () => {
    let component: SortComponent;
    let fixture: ComponentFixture<SortComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ 
                SortComponent 
            ],
            imports: [ 
                MaterialModule, 
                HttpClientTestingModule 
            ],
            providers: [
                { provide: ApiService, useClass: MockApiService }
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
