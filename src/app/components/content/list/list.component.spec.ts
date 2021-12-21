import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MaterialModule } from 'src/app/material.module';
import { EmptyListItemComponent } from '../empty-list-item/empty-list-item.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockGiveaways } from 'src/app/data/giveaways';
import { RouterTestingModule } from '@angular/router/testing';

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
                HttpClientTestingModule,
                RouterTestingModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render list items when giveaways set', () => {
        component.giveaways = [ ...mockGiveaways ];
        fixture.detectChanges();
        const listItems = fixture.nativeElement.querySelectorAll('app-list-item');
        expect(listItems.length).toEqual([...mockGiveaways].length);
        const emptyListItems = fixture.nativeElement.querySelectorAll('app-empty-list-item');
        expect(emptyListItems.length).toEqual(0);
    })

    it('should render empty list item when giveaways set and it has no value', () => {
        component.giveaways = [];
        fixture.detectChanges();
        const emptyListItems = fixture.nativeElement.querySelectorAll('app-empty-list-item');
        expect(emptyListItems.length).toEqual(1);
        const listItems = fixture.nativeElement.querySelectorAll('app-list-item');
        expect(listItems.length).toEqual(0);
    });
});
