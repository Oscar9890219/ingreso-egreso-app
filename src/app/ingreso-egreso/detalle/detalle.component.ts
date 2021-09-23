import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/Models/ingreso.egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgresoList: any[] = [];
  ingresosSubs: Subscription;

  constructor(private store: Store<AppStateWithIgreso>,
              private  ingresoEgresoService: IngresoEgresoService) { }
  

  ngOnInit(): void {


    this.ingresosSubs = this.store.select('ingresosEgresos').subscribe(({ items }) => {

      this.ingresoEgresoList = items;

      
    });

  }

  borrar(uid: string) {
  
    this.ingresoEgresoService.borrarIngresoEgreso( uid )
    .then( () => Swal.fire('Borrado', 'Item borrado', 'success'))
    .catch( err => Swal.fire('Error',  err.message, 'error') )

  }

  ngOnDestroy(): void {
    
    this.ingresosSubs.unsubscribe();

  }


}
