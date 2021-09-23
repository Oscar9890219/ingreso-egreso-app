import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../Models/ingreso.egreso.model';

@Pipe({
  name: 'orderIngreso'
})
export class OrderIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    
    return items.sort( (a, b) => {

      if( a.tipo === 'ingreso' ){
        return -1;
      }else{
        return 1;
      }

    });
  }

}
