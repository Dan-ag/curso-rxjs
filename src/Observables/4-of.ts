import {of} from 'rxjs';


const obs$ = of( [1,2], {a:1, b:2}, ()=>{},true, 1,2,3,4,5 );


obs$.subscribe(
  next => console.log('next', next),
  null,
  ()=>console.log('Terminamos')
);

console.log( 'Fin del Obs$' );
