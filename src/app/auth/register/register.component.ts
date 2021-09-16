import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as actions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForma: FormGroup;
  cargando: boolean = false;
  uiSubscription:  Subscription;


  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>  ) {

    this.registroForma =  this.fb.group({

      nombre: ['', Validators.required ],
      password: ['', Validators.required ],
      correo: ['', [Validators.required, Validators.email] ]
    
    });

    this.uiSubscription = this.store.select( 'ui' ).subscribe( state => this.cargando = state.isLoading ); 

   }
  ngOnDestroy(): void {
    
    this.uiSubscription.unsubscribe();

  }

  ngOnInit() {


  }

  crearUsuario(){

    if( this.registroForma.invalid  ) { return;}

    this.store.dispatch(  actions.isLoading() );

    // Swal.fire({
    //   title: 'Please, wait...',
    //   didOpen: () => {

    //     Swal.showLoading()

    //   }});

     const { nombre, correo, password  } = this.registroForma.value;
     
     this.authService.crearUsuario( nombre, correo, password )
        .then ( credenciales => {
          
         // Swal.close();

         this.store.dispatch(  actions.stopLoading() );

          this.router.navigateByUrl( '/' );

        }).catch(err => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        }));

  }

}
