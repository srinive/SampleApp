import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../../models/team';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit,OnDestroy {

  teamList:Team[];
  countryCode:string;
  subscriptions:Subscription = new Subscription();
  
  constructor(private dataService:DataService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.countryCode=this.route.snapshot.params.countrycode;
    this.subscriptions.add(
      this.dataService.getTeams(this.countryCode).subscribe((list)=>{
        this.teamList=list;
      })  
    );
  }

  ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }

}
