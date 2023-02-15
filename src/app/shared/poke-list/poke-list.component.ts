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


  public search(value: string) {
    this.filter = this.allPokemons.filter(
      (pokemon: any) => !pokemon.name.indexOf(value.toLowerCase())
    )
  }

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.nextPage()
  }
  nextPage() {
    this.pokeApiService.apiListAllPokemons(this.offset, this.limit).subscribe(
      res => {
        this.allPokemons = res.results
        this.filter = res.results
        console.log(res)
      }
    )
    this.offset += 20;;
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
      this.nextPage()
    }
  }

}
