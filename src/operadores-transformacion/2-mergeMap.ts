import { mergeMap, take, map, mergeMapTo, takeUntil } from 'rxjs/operators';
import { interval, of, Observable, fromEvent } from 'rxjs';
https://dev.to/angular/ain-t-nobody-needs-hostlistener-fg4
const letras$ = of<string>( 'a', 'b', 'c' );

letras$.pipe(
  mergeMap( letra => interval( 1000 ).pipe(
    map( i => letra + 1 ),
    take( 3 )
  ) )
)
  // .subscribe( {
  //   next: val => console.log( 'next: ', val ),
  //   complete: () => console.log( 'Complete' )
  // } );

const mouseDown$ = fromEvent( document, 'mousedown' )
const mouseup$ = fromEvent( document, 'mouseup' )
const interval$ = interval()

mouseDown$.pipe(
  mergeMap( () => interval$.pipe(
    takeUntil( mouseup$ )
  ) )
)
.subscribe( console.log )