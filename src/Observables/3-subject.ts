import { Observable, Subscriber, Observer, Subject } from 'rxjs';


const observer: Observer<any> = {
  next: value => console.log( 'siguiente [ next ]:', value ),
  error: error => console.warn( 'error [obs]:', error ),
  complete: () => console.log( 'completado...' )
};

const intervalo$ = new Observable<number>( subs => {

  const intervalID = setInterval( () => {
    subs.next( Math.random() )
  }, 1000);

  return () => {
    clearInterval( intervalID );
    console.log('Intervalo destruido..')
  };

} );

// const subs1 = intervalo$.subscribe(  rnd => console.log( 'subs1', rnd ) );
// const sub2 = intervalo$.subscribe(  rnd => console.log( 'subs2', rnd ) );

/**
 * 1- Casteo multiple
 * 2- Tambien es un observer
 * 3- next, error y complete
 */

const subject$ = new Subject();
const intervalSuscripcion = intervalo$.subscribe( subject$ );

const subs1 = subject$.subscribe( observer );
const subs2 = subject$.subscribe( observer );

setTimeout( () => {
  subject$.next(10);
  subject$.complete();

}, 3500 );



