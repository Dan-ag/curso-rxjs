import { ajax, AjaxError } from 'rxjs/ajax';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const url = 'https://httpbin.org/delayxx/1';

const manejaError = ( resp: AjaxError ) => {
  console.warn( 'error', resp.message );
  return of( {
    ok: false,
    usuarios: []
  } );
};

const obs$ = ajax.getJSON( url ).pipe(
  catchError( manejaError )
);
// const obs2$ = ajax( url ).pipe(
//   catchError( manejaError )
// );

// obs2$.subscribe( data => console.log( 'ajax:', data ) );
obs$
  .pipe(
    catchError( manejaError )
  )
  .subscribe( {
    next: val => console.log( 'next:', val ),
    error: err => console.log( 'err: ', err ),
    complete: () => console.log( 'complete' )
  });