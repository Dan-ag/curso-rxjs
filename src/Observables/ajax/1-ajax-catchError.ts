import { ajax, AjaxError } from "rxjs/ajax";
import { pluck, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


const url = 'https://api.github.com/users?per_page=5';

// const manejaErrores = ( response: Response ) => {
//   if ( !response.ok ) {
//     throw new Error( response.statusText );
//   }

//   return response;
// };

const atrapaErrores = (err: AjaxError ) => {
  console.warn( 'error en: ', err.message );
  return of( [] );
}

// const fetchPromesa = fetch( url );

// fetchPromesa
//   .then( manejaErrores  )
//   .then( resp => resp.json() )
//   .then( data => console.log( 'data:', data ) )
//   .catch( error=> console.warn('error ussuarios', error) );

ajax( url ).pipe(
  pluck( 'response' ),
  catchError( atrapaErrores )
)
.subscribe( users => console.log('usuarios:', users) );
