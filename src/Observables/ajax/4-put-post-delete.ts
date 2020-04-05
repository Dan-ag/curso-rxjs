import { ajax } from 'rxjs/ajax';


const url = 'https://httpbin.org/delay/1';


ajax.post( url, {
  id: 1,
  nombre: 'Danilo'
}, {
  "mi-token": '123ABC'
} )
  .subscribe( console.log )


ajax( {
  url,
  method: 'POST',
  headers: {
    "mi-token": '123ABC'
  },
  body: {
    id: 1,
    nombre: 'Danilo'
  }
} )
.subscribe( console.log )