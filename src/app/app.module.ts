import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FilterComponent } from './components/content/filter/filter.component';
import { ListComponent } from './components/content/list/list.component';
import { SortComponent } from './components/content/sort/sort.component';
import { DetailsComponent } from './components/details/details.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
      AppComponent,
      HeaderComponent,
      ContentComponent,
      FilterComponent,
      ListComponent,
      SortComponent,
      DetailsComponent,
      FooterComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      FlexLayoutModule,
      MaterialModule
  ],
  providers: [],
  bootstrap: [ 
      AppComponent 
  ]
})
export class AppModule { }
