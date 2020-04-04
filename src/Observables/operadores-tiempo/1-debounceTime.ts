import { fromEvent } from 'rxjs';
import { debounceTime, mapTo, map, tap, pluck, distinctUntilChanged } from 'rxjs/operators';

const click$ = fromEvent( document, 'click' )

click$.pipe(
  debounceTime(3000)
)
  .subscribe( console.log )


// Ejemplo 2

const input = document.createElement('input');

document.querySelector('body').append( input );



const input$ = fromEvent<KeyboardEvent>( input, 'keyup' );

// const input$ = fromEvent<KeyboardEvent>( input, 'keyup' ).pipe(
//   tap( console.log ),
//   map( ( { target } ) => target.value )
// );

input$.pipe(
  debounceTime( 1000 ),
  pluck('target', 'value'),
  distinctUntilChanged()
)
.subscribe( console.log );
