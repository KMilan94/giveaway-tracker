import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { ListItemComponent } from './list-item.component';

const RouterSpy = jasmine.createSpyObj(
    'Router',
    ['navigate']
  );

describe('ListItemComponent', () => {
    let component: ListItemComponent;
    let fixture: ComponentFixture<ListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ListItemComponent
            ],
            imports: [
                MaterialModule,
                RouterTestingModule
            ]
        }).compileComponents();
    });

    afterEach(() => {
        fixture.destroy();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
