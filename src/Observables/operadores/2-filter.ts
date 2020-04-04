import { range, from, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface Heroes {
  tipo: string;
  nombre: string;
}

range( 1, 10 ).pipe(
  filter( ( el, i ) => el%2 === 0)
).subscribe( console.log)

const personajes: Heroes[] = [
  {
    tipo: 'heroe',
    nombre: 'Batman'
  },
  {
    tipo: 'heroe',
    nombre: 'Robin'
  },
  {
    tipo: 'villano',
    nombre: 'Joker'
  }
]

from( personajes ).pipe(
  filter( personaje => personaje.tipo === 'heroe')
).subscribe( console.log );

const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' ).pipe(
  map( event => event.code ), // keyboardEvent, string
  filter( key => key === 'Enter' )
)

keyup$.subscribe( console.log )
