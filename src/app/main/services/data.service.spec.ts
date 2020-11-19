import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from '../../../environments/environment';
import { Country } from '../models/country';
import { Team } from '../models/team';
 
describe('DataService', () => {
  let service: DataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list countries', () => {
    const countryList:Country[]=[];
    countryList.push({ code: 'AO', name: 'Augusta', region:'Asia' });
    countryList.push({ code: 'US', name: 'United States', region:'Americas' });
    const requestData={ AO: { country: 'Augusta', region: 'Asia'}, US: { country: 'United States', region: 'Americas'}};
    service.getCountries().subscribe((list)=>{
      expect(list).toBeDefined();
      expect(list.length).toBeGreaterThanOrEqual(2);
      expect(list).toEqual(countryList);
    });
    const request=httpTestingController.expectOne(`${environment.apiUrl}/countries`);
    expect(request.request.method).toBe('GET');
    request.flush({data:requestData});
    httpTestingController.verify();
  });

  it('should list teams for a country', () => {
    const teamList:Team[]=[];
    teamList.push({id: '1', constituency:'test constituency', team: 'Team 1', "team-full": 'Team One', country: 'AU', host:'AO', address:'Test address', establishment: '2011-12-10', email: 'test@test.com' });
    teamList.push({id: '2', constituency:'test constituency', team: 'Team 2', "team-full": 'Team Two', country: 'AU', host:'AO', address:'Test address 2', establishment: '2011-11-10', email: 'test2@test.com' });

    service.getTeams('AU').subscribe((list)=>{
      expect(list).toBeDefined();
      expect(list.length).toBeGreaterThanOrEqual(2);
      expect(list).toEqual(teamList);
    });
    const request=httpTestingController.expectOne(`${environment.apiUrl}/teams?country=AU`);
    expect(request.request.method).toBe('GET');
    request.flush({data:teamList});
    httpTestingController.verify();
  });

});
