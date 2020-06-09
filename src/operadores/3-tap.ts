import { range } from "rxjs";
import { tap, map } from 'rxjs/operators';

const numero$ = range(1,5)

numero$.pipe( 
  tap( x => console.log( 'antes', x ) ),
  map( val => val * 10 ),
  tap( {
    next: valor => console.log( 'despues', valor ),
    complete: ()=> console.log('Se termino todo')
  } )
)
.subscribe( val => console.log( 'subs', val));
