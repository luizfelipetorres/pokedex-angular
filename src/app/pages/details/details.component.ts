import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnChanges {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  public pokemon: any[] = [];
  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.getPokemon()
  }

  ngOnInit(): void {
    this.getPokemon()
    this.activatedRoute.params.subscribe(
      params => {
        this.getPokemon()
      }
    );
  }

  public getPokemon() {
    const id = this.activatedRoute.snapshot.params['id']
    return this.pokeApiService.getPokemonInfo(`${this.urlPokemon}/${id}`).subscribe(
      (pokemon: any) => {
        this.pokeApiService.getPokemonInfo(`${pokemon.species.url}`).subscribe(
          (species: any) => {
            this.pokemon[0] = pokemon;
            this.pokemon[1] = species
            console.log(this.pokemon)
          }
        )
      }
    )
  }

  public splitLast(url: string) {
    const arr = url.split('/')
    return arr[arr.length - 2]
  }

}
