import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../Models/ingreso.egreso.model';
import { AuthService } from '../services/auth.service';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';


  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService) {

    this.ingresoForm = this.fb.group({

      monto: ['', Validators.required],
      descripcion: ['', Validators.required],

    })

  }

  agregar(){

     if( this.ingresoForm.invalid ){ return; }

    console.log( this.ingresoForm );

    const { monto, descripcion }  = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
    .then( () => {

      this.ingresoForm.reset();
      Swal.fire('Registro creado', descripcion  , 'success');

    })
    .catch( err => {

      Swal.fire('Error', err.message , 'error');
    });

  }

  ngOnInit(): void {
  }

}
