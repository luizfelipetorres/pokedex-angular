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
  public pokemon: any;
  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPokemon()
  }

  public getPokemon() {
    const id = this.activatedRoute.snapshot.params['id']
    const apiPokemon = this.pokeApiService.getPokemonInfo(`${this.urlPokemon}/${id}`)
    const apiName = this.pokeApiService.getPokemonInfo(`${this.urlName}/${id}`)

    return forkJoin([apiPokemon, apiName]).subscribe(
      res => {
        console.log(res)
        this.pokemon = res
      }
    )
  }

}
