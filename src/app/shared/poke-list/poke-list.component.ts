import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public allPokemons: any = []
  public filter: any
  public _search: string | undefined
  public offset: number = 0;
  public limit: number = 20;
  public nextPage: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
  public previousPage: string | undefined;



  public search(value: string) {
    this.filter = this.allPokemons.filter(
      (pokemon: any) => !pokemon.name.indexOf(value.toLowerCase())
    )
  }

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.changePageTo(this.nextPage)
  }

  public changePageTo(url: string) {
    this.pokeApiService.apiListAllPokemons(url).subscribe(
      res => {
        this.allPokemons = res.results
        this.filter = res.results
        this.nextPage = res.next
        this.previousPage = res.previous
        console.log(res)
      }
    )
  }
}
