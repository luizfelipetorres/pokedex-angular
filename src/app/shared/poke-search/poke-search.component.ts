import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent {

  @Output() public emitSearch: EventEmitter<string> = new EventEmitter()

  public search(value: string){
    const name = value.trim().toLowerCase().replace(/ /gm, '-')
    this.emitSearch.emit(name)
  }

}
