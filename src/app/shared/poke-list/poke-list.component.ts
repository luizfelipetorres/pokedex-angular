import { Component, OnInit } from '@angular/core';
import { EPage } from 'src/app/core/enums/EPage.enum';
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

  get nextPage(): EPage {
    return EPage.NEXT
  }

  get previousPage(): EPage {
    return EPage.PREVIOUS
  }

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value
    this.filter = this.allPokemons.filter(
      (pokemon: any) => !pokemon.name.indexOf(value.toLowerCase())
    )
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

  constructor(private _pokeApiService: PokeApiService) { }

  public get pokeApiService(): PokeApiService {
    return this._pokeApiService;
  }

  ngOnInit(): void {
    this.changePageTo(EPage.CURRENT)
  }

  public changePageTo(page: EPage) {
    this.pokeApiService.apiListAllPokemons(page).subscribe(
      res => {
        this.allPokemons = res.results
        this.filter = res.results
      }
    )
  }
}
