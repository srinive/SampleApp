import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Country } from '../../models/country';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit,OnDestroy {

  countryList:Country[];
  subscriptions:Subscription = new Subscription();
  
  constructor(private dataService:DataService,private router:Router) { }


  ngOnInit(): void {
    this.countryList=[];
    this.subscriptions.add(
      this.dataService.getCountries().subscribe((list)=>{
        this.countryList=list;
      })  
    );
  }

  ngOnDestroy() :void {
    this.subscriptions.unsubscribe();
  }

}
