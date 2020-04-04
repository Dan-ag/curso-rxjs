import { scan, reduce, map } from "rxjs/operators";
import { from } from 'rxjs';

const numeros = [1,2,3,4,5];

// const totalAcumulador = ( acc, cur ) => {
//   return acc + cur;
// }

const totalAcumulador = ( acc, cur ) => acc + cur;

// reduce
from( numeros ).pipe(
  reduce( totalAcumulador, 0)
)
  .subscribe( console.log )


// scan
from( numeros ).pipe(
  scan( totalAcumulador, 0)
)
  .subscribe( console.log )

// redux
interface Usuario {
  id?: string,
  autenticado?: boolean, 
  token?: string,
  edad?: number
}

const user: Usuario[] = [
  { id: 'fher', autenticado: false, token: null },
  { id: 'fher', autenticado: true, token: 'abc' },
  { id: 'fher', autenticado: true, token: 'abc123' }
]

const state$ = from( user ).pipe(
  scan<Usuario>( ( acc, cur ) => {
    return { ...acc, ...cur }
  }, { edad: 33 } )
)

const id$ = state$.pipe(
  map( state =>  state )
)

id$.subscribe( console.log )