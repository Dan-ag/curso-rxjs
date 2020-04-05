import { fromEvent, merge, Observable, combineLatest } from 'rxjs';
import { pluck } from 'rxjs/operators';

// const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' );
// const click$ = fromEvent<MouseEvent>( document, 'click' );

// combineLatest(
//   keyup$.pipe( pluck<KeyboardEvent,string>( 'type' ) ),
//   click$.pipe( pluck<MouseEvent,string>( 'type' ) )
// ).subscribe( console.log );

const input1 = document.createElement( 'input' )
const input2 = document.createElement( 'input' )

input1.placeholder = 'email@g.com'

input2.placeholder = '***************'
input2.type = 'password'

document.querySelector( 'body' ).append( input1, input2 );


// Helper
const getInputStream = ( elem: HTMLElement ) =>
  fromEvent<KeyboardEvent>( elem, 'keyup' )
  .pipe(
    pluck<KeyboardEvent, string>( 'target', 'value' )
  )

combineLatest( 
  getInputStream( input1 ),
  getInputStream( input2 )
).subscribe( console.log )

