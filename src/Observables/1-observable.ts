import { Observable, Subscriber, Observer } from 'rxjs';


const observer: Observer<any> = {
  next: value => console.log( 'siguiente [ next ]:', value ),
  error: error => console.warn( 'error [obs]:', error ),
  complete: () => console.log('completado...')
}

// const obs$ = Observable.create();

const obs$ = new Observable<string>( susbs => {
  susbs.next('Hola');
  susbs.next( 'Mundo' );
  
  // Forzar error
  // const a = undefined;
  // a.nombre = 'x'


  susbs.complete();
  susbs.next('hola')

} );

// obs$.subscribe( console.log );

// obs$.subscribe( valor => {
//   console.log('valor', valor);
// }, error => {
//   console.warn('error', error);
// }, () => {
//   console.log('completed...');
// }  )


obs$.subscribe( observer );





