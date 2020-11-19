import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './components/country-list/country-list.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { MainRoutingModule } from './main.routing.module';



@NgModule({
  declarations: [CountryListComponent, TeamListComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
