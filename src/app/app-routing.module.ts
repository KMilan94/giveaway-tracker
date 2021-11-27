import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './components/content/content.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [{
  path: '', component: ContentComponent, pathMatch: 'full',
}, {
  path: 'details/:id', component: DetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
