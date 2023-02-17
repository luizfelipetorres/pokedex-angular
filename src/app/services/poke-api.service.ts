import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EPage } from '../core/enums/EPage.enum';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) { }

  private _nextPage: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
  private _currentPage: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
  private _previousPage: string = '';

  public get previousPage(): string {
    return this._previousPage;
  }



  public apiListAllPokemons(page: EPage): Observable<any> {

    const requestPage = () => {
      switch (page) {
        case EPage.NEXT:
          return this._nextPage
        case EPage.PREVIOUS:
          return this.previousPage
        default:
          return this._currentPage
      }
    }

    return this.http.get(requestPage()).pipe(
      tap((baseResult: any) => {
        this._currentPage = requestPage()
        this._nextPage = baseResult.next
        this._previousPage = baseResult.previous

        baseResult.results.map((poke: any) => {
          this.getPokemonInfo(poke.url).subscribe(
            status => {
              poke.status = status

            }
          )
        })
      })
    )
  }

  public getPokemonInfo(url: string): Observable<any> {
    return this.http.get(url);
  }
}
