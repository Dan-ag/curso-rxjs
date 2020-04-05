import { ajax } from 'rxjs/ajax';
import { startWith } from 'rxjs/operators';

const loadingDiv = document.createElement( 'div' )
loadingDiv.classList.add('loading')
loadingDiv.innerHTML = 'Cargando...'

const body = document.querySelector( 'body' )


// Stream
ajax.getJSON( 'https://reqres.in/api/users/2?delay=3' ).pipe(
  startWith(true)
)
  .subscribe( resp => {
    console.log( resp );
    
    if ( resp === true ) {
      body.append( loadingDiv );
    } else {
      document.querySelector( '.loading' ).remove();
    }
})