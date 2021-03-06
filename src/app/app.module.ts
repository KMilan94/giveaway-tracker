import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SwiperModule } from 'swiper/angular';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FilterComponent } from './components/content/filter/filter.component';
import { ListComponent } from './components/content/list/list.component';
import { SortComponent } from './components/content/sort/sort.component';
import { DetailsComponent } from './components/details/details.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListItemComponent } from './components/content/list-item/list-item.component';
import { EmptyListItemComponent } from './components/content/empty-list-item/empty-list-item.component';
import { BannerComponent } from './components/banner/banner.component';
import { FabSettingsComponent } from './components/fab-settings/fab-settings.component';
import { FabScrollToTopComponent } from './components/fab-scroll-to-top/fab-scroll-to-top.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContentComponent,
        FilterComponent,
        ListComponent,
        SortComponent,
        DetailsComponent,
        FooterComponent,
        ListItemComponent,
        EmptyListItemComponent,
        BannerComponent,
        FabSettingsComponent,
        FabScrollToTopComponent,
        ProgressSpinnerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule,
        MaterialModule,
        SwiperModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
