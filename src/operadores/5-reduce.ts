import { reduce, take, tap } from "rxjs/operators";
import { interval } from 'rxjs';

const number = [ 1, 2, 3, 4, 5 ]

const totalRecucer = ( acumulador: number, valorActual: number ) => {

  return acumulador + valorActual;

}

const total = number.reduce( totalRecucer, 0 );
console.log( total );

interval( 500 ).pipe(
  take( 3 ),
  tap(console.log),
  reduce( totalRecucer, 5 )
)
  .subscribe( {
    next: val => console.log( 'next', val ),
    complete: () => console.log('Complete')
} );

