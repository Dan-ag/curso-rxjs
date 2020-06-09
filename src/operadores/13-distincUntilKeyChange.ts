import { of, from } from 'rxjs';
import { distinct, distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs/operators';

const numeros$ = of<number | string>( 1, '1', 1, 2, 3, 1, 5, 3, 4, 7 );


numeros$.pipe(
  distinct() // ===
)
  .subscribe( console.log );


interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  {
    nombre: 'Megaman'
  },
  {
    nombre: 'Megaman'
  },
  {
    nombre: 'Zero'
  },
  {
    nombre: 'x'
  },
  {
    nombre: 'x'
  },
  {
    nombre: 'Megaman'
  },
  {
    nombre: 'x'
  },
];


from( personajes )
  .pipe(
    distinctUntilKeyChanged( 'nombre' )
  )
  .subscribe( console.log );