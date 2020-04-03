import { range, Observable, pipe, fromEvent } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';


// const obs$: Observable<number> = range( 1, 5 )
//   .pipe(
//     map( el => {
//       return el*10;
//     }
//     )
//   )


// obs$.subscribe( console.log );

const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const keyupCode$ = keyup$.pipe(map( event => event.code ));

const keyupPluck$ = keyup$.pipe( pluck('target', 'baseURI'));
const keyupMapTo$ = keyup$.pipe( mapTo('tecla presionada'));



keyup$.subscribe( console.log )
keyupCode$.subscribe( code => console.log('map', code ) );
keyupPluck$.subscribe( code => console.log('pluck', code ) );
keyupMapTo$.subscribe( code => console.log('mapto', code ) );



