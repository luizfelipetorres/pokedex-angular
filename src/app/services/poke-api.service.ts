import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) { }

  public apiListAllPokemons(offset: number, limit: number): Observable<any> {
    const url: string = `${this.baseUrl}/?offset=${offset}&limit=${limit}`
    return this.http.get(url).pipe(
      tap((baseResult: any) => {
        baseResult.results.map((poke: any) => {
          this.getPokemonInfo(poke.url).subscribe(
            status => poke.status = status
          )
        })
      })
    )
  }

  public getPokemonInfo(url: string): Observable<any> {
    return this.http.get(url);
  }
}
