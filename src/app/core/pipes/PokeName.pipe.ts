import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pokeName' })
export class PokeName implements PipeTransform {
  transform(value: string): string {
    return value.trim().replace(/-/gm, ' ');
  }
}
