import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20';
  constructor(private http: HttpClient) { }

  get apiListAllPokemons(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      tap(
        res => res
      ),
      tap(
        res => {
          console.log(res)
        }
      )
    )
  }
}
