import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/country';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) { }

  getCountries():Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/countries`).pipe(
      map((response:any) => {
        const countryList:Country[]=[];
        for(let prop of Object.keys(response.data)){
          countryList.push({ code: prop, name: response.data[prop].country, region:  response.data[prop].region });
        }
        return countryList;
      })
    );
  }

  getTeams(strCountry:string):Observable<Team[]>{
    return this.httpClient.get<Team[]>(`${environment.apiUrl}/teams?country=${strCountry}`).pipe(
      map((response:any) => response.data)
    );
  }

}
