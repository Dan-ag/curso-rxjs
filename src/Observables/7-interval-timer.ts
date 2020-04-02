import { interval, timer } from 'rxjs';

const observer = {
  next: val => console.log( 'next', val ),
  complete: () => console.log('complete'),
}

const hoy5 = new Date();
hoy5.setSeconds( hoy5.getSeconds() + 5 );


const interval$ = interval( 1000 );
// const timer$ = timer(2000);
// const timer$ = timer(2000, 1000);

const timer$ = timer( hoy5 );


console.log('inicio');
// interval$.subscribe( observer );
timer$.subscribe( observer );
console.log('fin');