import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryListComponent } from './country-list.component';
import { DataService } from '../../services/data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamListComponent } from '../team-list/team-list.component';
import { of } from 'rxjs';
import { Country } from '../../models/country';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  const countryList:Country[]=[];
  countryList.push({ code: 'AO', name: 'Augusta', region:'Asia' });
  countryList.push({ code: 'US', name: 'United States', region:'Americas' });

  beforeEach(async(() => {
    const spyDataService = jasmine.createSpyObj('DataService', ['getCountries']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'teams/:countrycode', component: TeamListComponent}]
        )
      ],
      declarations: [ CountryListComponent ],
      providers: [ { provide: DataService, useValue: spyDataService }]
    })
    .compileComponents();
    dataServiceSpy=TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    dataServiceSpy.getCountries.and.returnValue(of(countryList));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have list of countries', () => {
    expect(component).toBeTruthy();
    expect(component.countryList).toBeDefined();
    expect(component.countryList.length).toBeGreaterThanOrEqual(2);
  });

  it('should rener list of countries', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('table tbody tr td').textContent).toBeDefined();
  });
});
