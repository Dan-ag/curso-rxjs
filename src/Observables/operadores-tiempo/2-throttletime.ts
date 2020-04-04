import { fromEvent, asyncScheduler } from 'rxjs';
import { debounceTime, mapTo, map, tap, pluck, distinctUntilChanged, throttleTime } from 'rxjs/operators';

const click$ = fromEvent( document, 'click' );

click$.pipe(
  throttleTime( 3000 )
)
  .subscribe( console.log );


// Ejemplo 2

const input = document.createElement( 'input' );

document.querySelector( 'body' ).append( input );



const input$ = fromEvent<KeyboardEvent>( input, 'keyup' );

// const input$ = fromEvent<KeyboardEvent>( input, 'keyup' ).pipe(
//   tap( console.log ),
//   map( ( { target } ) => target.value )
// );

input$.pipe(
  throttleTime( 1000, asyncScheduler, {
    leading: true, // primera entrada
    trailing: true // ultima
  } ),
  pluck( 'target', 'value' ),
  distinctUntilChanged()
)
  .subscribe( console.log );
