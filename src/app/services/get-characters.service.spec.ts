import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GetCharactersService } from './get-characters.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
 

describe('GetCharactersService', () => {
  let httpTestingController: HttpTestingController;
  let service: GetCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetCharactersService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GetCharactersService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve user information via GET request', () => {
    // Emula una respuesta de la API
    const mockUser = {
      "info": {
        "count": 826,
        "pages": 42,
        "next": "https://rickandmortyapi.com/api/character/?page=2",
        "prev": null
      },
      "results": [
        {
          "id": 1,
          "name": "Rick Sanchez",
          "status": "Alive",
          "species": "Human",
          "type": "",
          "gender": "Male",
          "origin": {
            "name": "Earth",
            "url": "https://rickandmortyapi.com/api/location/1"
          },
          "location": {
            "name": "Earth",
            "url": "https://rickandmortyapi.com/api/location/20"
          },
          "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          "episode": [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
            // ...
          ],
          "url": "https://rickandmortyapi.com/api/character/1",
          "created": "2017-11-04T18:48:46.250Z"
        }
      ]
    };

    // Llama al método que realiza la solicitud GET
    service.getCharacters(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    // Espera a que se realice la solicitud GET y responde con el objeto mockUser
    const req = httpTestingController.expectOne(`${environment.API_URL}character/?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
