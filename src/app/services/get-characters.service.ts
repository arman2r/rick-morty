import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCharactersService {

  constructor(private http: HttpClient) { }

  getCharacters(page?: number) {
    return this.http.get(`${environment.API_URL}character/?page=${page}`)
  }

  getCharacter(id?: any) {
    return this.http.get(`${environment.API_URL}character/${id}`)
  }

  getEpisodes(id?: string) {
    return this.http.get(`${environment.API_URL}episode/${id}`)
  }
 
  getData(param1: any): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}character/?name=${param1}`);
  }

  getData2(param2: any): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}character/?species=${param2}`);
  }

  getDataCriteria(param: any): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}character/?${param}`);
  }

   
}
