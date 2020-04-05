import { fromEvent, Observable } from 'rxjs';
import { debounce, debounceTime, map, pluck, mergeAll } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { GithubUsersResponse, GithubUser } from '../interfaces/GithubUser';

const body = document.querySelector('body')
const textInput = document.createElement('input')
const orderList = document.createElement('ol')
body.append( textInput, orderList );

// Helpers
const mostrerUsuarios = ( usuarios: GithubUser[] ) => {

  console.log( usuarios )
  orderList.innerHTML = ''

  for ( const usuario of usuarios ) {
    const li = document.createElement( 'li' );
    const img = document.createElement( 'img');
    img.src = usuario.avatar_url;

    const anchor = document.createElement('a');
    anchor.href = usuario.html_url;
    anchor.text = 'ver página';
    anchor.target = '_blank';


    li.append( img );
    li.append( usuario.login + ' ' );
    li.append( anchor );

    orderList.append( li )
  }



}



// Streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup' );



// input$.pipe(
//   debounceTime( 500 ),
//   map( event => {
//     const texto = event.target[ 'value' ]
    
//     return ajax.getJSON( `https://api.github.com/search/users?q=${ texto }` );
//   } )
// ).subscribe( resp => {
//   resp.pipe(
//     pluck('url')
//   ).subscribe( console.log )
// });

input$.pipe(
  debounceTime<KeyboardEvent>( 500 ),
  pluck<KeyboardEvent, string>( 'target', 'value' ),
  map<string, Observable<GithubUsersResponse>>( text => ajax.getJSON( `https://api.github.com/search/users?q=${ text }` ) ),
  mergeAll<GithubUsersResponse>(),
  pluck<GithubUsersResponse, GithubUser[]>('items')
).subscribe( mostrerUsuarios );