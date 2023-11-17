import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GetCharactersService {

  constructor(private http: HttpClient) { }

  getCharacters(page?: number) {
    return this.http.get(`${environment.API_URL}/character/?page=${page}`)
  }

  filterCharacter(name:string){
    return this.http.get(`${environment.API_URL}/character/?name=${name}`)
  }
}
