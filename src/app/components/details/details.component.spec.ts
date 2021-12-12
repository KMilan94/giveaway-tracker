import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
    let component: DetailsComponent;
    let route: ActivatedRoute;
    let fixture: ComponentFixture<DetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                DetailsComponent
            ],
            imports: [
                HttpClientTestingModule
            ],
            providers: [{
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
