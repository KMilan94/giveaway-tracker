
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';

import { FilterComponent } from './filter.component';
import { ApiService } from 'src/app/services/api.service';
import { MaterialModule } from 'src/app/material.module';
import { mockGiveaways } from 'src/app/data/giveaways';
import { platformData } from 'src/app/data/platforms';
import { typesData } from 'src/app/data/game-types';

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

    afterEach(() => {
        fixture.destroy();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle platform when show hide button was pressed', () => {
        component.platformsExpanded = true;
        fixture.detectChanges();
        const showHideButton = fixture.nativeElement.querySelector('.show-hide');
        showHideButton.click();
        expect(component.platformsExpanded).toEqual(false);
    });

    it('should populate option fields from giveaways', () => {
        spyOn(component, 'ngOnChanges').and.callThrough();
        component.ngOnChanges({
            giveaways: new SimpleChange([], [...mockGiveaways], true)
        });
        fixture.detectChanges();
        expect(component.platforms).toEqual(platformData);
        expect(component.types).toEqual(typesData);
        expect(component.ngOnChanges).toHaveBeenCalled();
    });

    it('should set platform type when radio button was pressed', () => {
        spyOn(component, 'setPlatform');
        component.ngOnChanges({
            giveaways: new SimpleChange([], [...mockGiveaways], true)
        });
        fixture.detectChanges();
        const platformButton2 = fixture.nativeElement.querySelectorAll('.platform-button')[1];
        platformButton2.click();
        fixture.detectChanges();
        expect(component.setPlatform).toHaveBeenCalledOnceWith('android');
    });

    it('should set game type when radio button was pressed', () => {
        spyOn(component, 'setGameType');
        component.ngOnChanges({
            giveaways: new SimpleChange([], [...mockGiveaways], true)
        });
        fixture.detectChanges();
        const typeButton2 = fixture.nativeElement.querySelectorAll('.type-button')[1];
        typeButton2.click();
        fixture.detectChanges();
        expect(component.setGameType).toHaveBeenCalledOnceWith('beta');
    });
});
