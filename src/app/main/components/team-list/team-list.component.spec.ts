import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListComponent } from './team-list.component';
import { DataService } from '../../services/data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CountryListComponent } from '../country-list/country-list.component';
import { Team } from '../../models/team';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  const teamList:Team[]=[];
  teamList.push({id: '1', constituency:'test constituency', team: 'Team 1', "team-full": 'Team One', country: 'AU', host:'AO', address:'Test address', establishment: '2011-12-10', email: 'test@test.com' });
  teamList.push({id: '2', constituency:'test constituency', team: 'Team 2', "team-full": 'Team Two', country: 'AU', host:'AO', address:'Test address 2', establishment: '2011-11-10', email: 'test2@test.com' });


  beforeEach(async(() => {
    const spyDataService = jasmine.createSpyObj('DataService', ['getTeams']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: '', component: CountryListComponent}]
        )
      ],
      declarations: [ TeamListComponent ],
      providers: [ { provide: DataService, useValue: spyDataService }]
    })
    .compileComponents();
    dataServiceSpy=TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    dataServiceSpy.getTeams.and.returnValue(of(teamList));
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have list of teams', () => {
    expect(component).toBeTruthy();
    expect(component.teamList).toBeDefined();
    expect(component.teamList.length).toBeGreaterThanOrEqual(2);
  });
  it('should rener list of teams', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('table tbody tr td').textContent).toBeDefined();
  });
});
