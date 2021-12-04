import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MaterialModule } from 'src/app/material.module';
import { EmptyListItemComponent } from '../empty-list-item/empty-list-item.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ListComponent,
                EmptyListItemComponent,
                ListItemComponent
            ],
            providers: [ 
                ApiService
            ],
            imports: [
                MaterialModule,
                HttpClientTestingModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
