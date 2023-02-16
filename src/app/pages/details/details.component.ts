import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  public pokemon: any[] = [];
  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPokemon()
  }

  public getPokemon() {
    const id = this.activatedRoute.snapshot.params['id']
    return this.pokeApiService.getPokemonInfo(`${this.urlPokemon}/${id}`).subscribe(
      (pokemon: any) => {
        this.pokeApiService.getPokemonInfo(`${pokemon.species.url}`).subscribe(
          (species: any) => {
            this.pokemon[0] = pokemon;
            this.pokemon[1] = species
          }
        )

      }
    )
  }

}
