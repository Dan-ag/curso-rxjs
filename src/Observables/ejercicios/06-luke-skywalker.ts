import { ajax } from 'rxjs/ajax';
import { switchMap, map, tap, concatMap, mergeAll, sampleTime } from 'rxjs/operators';
import { zip, of } from 'rxjs';

/**
 * Ejercicio: 
 *  Realizar 2 peticiones HTTP (ajax) una después de otra.
 *  
 *  La primera debe de obtener el personaje de Star Wars:
 *   Luke Skywalker, llamando el endpoint:   /people/1/
 * 
 *  La segunda petición, debe de ser utilizando el objeto
 *  de la petición anterior, y tomar la especie (species),
 *  que es un arreglo de URLs (array), dentro de ese arreglo, 
 *  tomar la primera posición y realizar la llamada a ese URL,
 *  el cual debería de traer información sobre su especie (Human)
 */

// Respuesta esperada:
// Información sobre los humanos en el universo de Star Wars
// Ejemplo de la data esperada
/*
 { name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
*/

// Respuesta esperada con Mayor dificultad
// Retornar el siguiente objeto con la información de ambas peticiones
// Recordando que se disparan una después de la otra, 
// con el URL que viene dentro del arreglo de 'species'

// Tip: investigar sobre la función zip: 
//      Que permite combinar observables en un arreglo de valores
// https://rxjs-dev.firebaseapp.com/api/index/function/zip

// Ejemplo de la data esperada:
/*
    especie: {name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
    personaje: {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair", …}
*/


( () => {

    // No tocar ========================================================
    const SW_API = 'https://swapi.co/api';
    const getRequest = ( url: string ) => ajax.getJSON<any>( url );
    // ==================================================================

    // Realizar el llamado al URL para obtener a Luke Skywalker
    getRequest( `${ SW_API }/people/1/` ).pipe(
        // Realizar los operadores respectivos aquí
        switchMap( resp => zip(
            of( resp ),
            getRequest( resp.species[ 0 ] ) )
        ),
        map( ( [ personaje, especie ] ) => ( { especie, personaje } ) )
        // tap(console.log),
        // map( resp => {
        //   const resp2 = getRequest( resp.species[ 0 ] )
        //   resp2.subscribe( console.log )
        //   return resp2
        // } )

        // NO TOCAR el subscribe ni modificarlo ==
    )
        .subscribe( console.log );           // ==
    // =======================================

    // input$.pipe(
    //   debounceTime<KeyboardEvent>( 500 ),
    //   pluck<KeyboardEvent, string>( 'target', 'value' ),
    //   map<string, Observable<GithubUsersResponse>>( text => ajax.getJSON( `https://api.github.com/search/users?q=${ text }` ) ),
    //   mergeAll<GithubUsersResponse>(),
    //   pluck<GithubUsersResponse, GithubUser[]>( 'items' )
    // ).subscribe( mostrerUsuarios );

    // const test$ = zip(
    //   luke$,
    //   luke$.pipe(
    //     map( resp => getRequest( resp.species[ 0 ] ) ),
    //     mergeAll()
    //   ) 
    //   // of(  )
    //   // getRequest( `${ SW_API }/people/1/` ),
    //   // tap(console.log),
    //   // mergeAll( () => {
    //   //   const species$ = luke$.pipe(
    //   //     map( resp => getRequest( resp.species[0] ) )
    //   //   )
    //   //   return species$;
    //   // })

    //   // concatMap(
    //   //   luke$,
    //   //   of(tap(console.log))
    //   // ),
    //   // of({}).pipe(tap(console.log))

    //   // // map<any, any>( resp => {
    //   // //   console.log(resp);
    //   // //   return of({})
    //   // //   luke$.subscribe(   )
    //   // // } )
    // )

    // test$.subscribe( ( [ personaje, especie ] ) => {
    //   console.log('Especie:', especie);
    //   console.log('Personaje:', personaje);
    // } )
} )();

