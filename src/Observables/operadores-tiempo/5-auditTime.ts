import { fromEvent } from 'rxjs';
import { auditTime, tap, pluck } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click' )

click$.pipe(
  pluck( 'x' ),
  tap(val => console.log('tap', val)),
  auditTime(2000)
)
  .subscribe( console.log )