import { of, range } from 'rxjs';

const src$ = range( 1, 5);

console.log('inicio');
src$.subscribe( console.log )
console.log('fin');