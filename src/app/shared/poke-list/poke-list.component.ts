import { Component, HostListener, Input, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public allPokemons: any = []
  public filter: any
  private _search: string = ''
  public offset: number = 0;
  public limit: number = 20;
  public nextPage: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
  public previousPage: string | undefined;


  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value
    this.filter = this.allPokemons.filter(
      (pokemon: any) => !pokemon.name.indexOf(value.toLowerCase())
    )
    console.log(this.search)
    if (this.filter.length == 0) {
      this.pokeApiService.getPokemonInfo(`https://pokeapi.co/api/v2/pokemon/${value}`).subscribe(
        res => {
          this.filter = [{
            name: res.name,
            status: res
          }]
        }
      )
    }
  }

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.changePageTo(this.nextPage)
    console.log(!this.search)
  }

  public changePageTo(url: string) {
    this.pokeApiService.apiListAllPokemons(url).subscribe(
      res => {
        this.allPokemons = res.results
        this.filter = res.results
        this.nextPage = res.next
        this.previousPage = res.previous
      }
    )
  }
}
