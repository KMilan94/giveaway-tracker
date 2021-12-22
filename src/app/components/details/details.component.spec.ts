import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from 'src/app/material.module';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
    let component: DetailsComponent;
    let fixture: ComponentFixture<DetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                DetailsComponent
            ],
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                RouterTestingModule
            ],
            providers: [
                {
                provide: ActivatedRoute,
                useValue: {
                    snapshot: {
                        paramMap: {
                            get(): string {
                                return '123';
                            }
                        }
                    }
                }
            }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailsComponent);
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
