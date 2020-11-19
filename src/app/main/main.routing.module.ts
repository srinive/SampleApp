import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { TeamListComponent } from './components/team-list/team-list.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
  },
  {
      path: 'teams/:countrycode',
      component:TeamListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }