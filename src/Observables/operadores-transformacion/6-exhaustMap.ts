import { fromEvent, interval } from 'rxjs';
import { switchMap, take, concatMap, exhaustMap } from 'rxjs/operators';

const interval$ = interval(500).pipe( take(3) );
const click$ = fromEvent( document, 'click' );


click$.pipe(
  exhaustMap( () => interval$ )
)
.subscribe( console.log )