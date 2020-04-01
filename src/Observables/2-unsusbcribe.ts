import { Observable, Subscriber, Observer } from 'rxjs';


const observer: Observer<any> = {
  next: value => console.log( 'siguiente [ next ]:', value ),
  error: error => console.warn( 'error [obs]:', error ),
  complete: () => console.log( 'completado...' )
}

const intervalos$ = new Observable<number>( suscriber => {
  let count = 0;
  
  
  suscriber.next( count );
  const interval =  setInterval( () => {
    count++;

    // cada segundo
    suscriber.next( count );
    console.log(count);
  }, 1000 );

  setTimeout( () => {
    suscriber.complete();
  }, 2500)
  
  return () => {
    clearInterval( interval )
    console.log('Intervalo destruido');
  }
} )

const sub1 = intervalos$.subscribe( observer );
const sub2 = intervalos$.subscribe( observer );
const sub3 = intervalos$.subscribe( observer );

sub1.add( sub2 )
    .add( sub3 ); 


setTimeout( () => {
  sub1.unsubscribe();
  // sub2.unsubscribe();
  // sub3.unsubscribe();

  console.log('Completado timeout..');
}, 6000)
