import { fromEvent, Observable } from 'rxjs';
import { debounce, debounceTime, map, pluck, mergeAll, mergeMap, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { GithubUsersResponse, GithubUser } from './Observables/interfaces/GithubUser';

const body = document.querySelector( 'body' );
const textInput = document.createElement( 'input' );
const orderList = document.createElement( 'ol' );
body.append( textInput, orderList );

// Helpers
const mostrerUsuarios = ( usuarios: GithubUser[] ) => {

  console.log( usuarios );
  orderList.innerHTML = '';

  for ( const usuario of usuarios ) {
    const li = document.createElement( 'li' );
    const img = document.createElement( 'img' );
    img.src = usuario.avatar_url;

    const anchor = document.createElement( 'a' );
    anchor.href = usuario.html_url;
    anchor.text = 'ver página';
    anchor.target = '_blank';


    li.append( img );
    li.append( usuario.login + ' ' );
    li.append( anchor );

    orderList.append( li );
  }
};

// Streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup' );

input$.pipe(
  debounceTime<KeyboardEvent>( 500 ),
  pluck<KeyboardEvent, string>( 'target', 'value' ),
  mergeMap<string, Observable<GithubUsersResponse>>( text => ajax.getJSON( `https://api.github.com/search/users?q=${ text }` ) ),
  // mergeAll<GithubUsersResponse>(),
  pluck<GithubUsersResponse, GithubUser[]>( 'items' )
);//.subscribe( mostrerUsuarios );

const url = 'https://httpbin.org/delay/1?arg='

input$.pipe(
  pluck( 'target', 'value' ),
  switchMap( text => ajax.getJSON( url + text ) )
).subscribe( console.log )