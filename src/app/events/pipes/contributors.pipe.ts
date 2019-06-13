import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contributors'
})
export class ContributorsPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if ( value === 0 ) {
      return 'Aucun participant';
    }

    if (value === 1) {
      return '1 participant';
    }

    return value + ' participants';
  }

}
