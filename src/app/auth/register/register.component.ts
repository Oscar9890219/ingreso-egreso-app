import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForma: FormGroup;


  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router) {

    this.registroForma =  this.fb.group({

      nombre: ['', Validators.required ],
      password: ['', Validators.required ],
      correo: ['', [Validators.required, Validators.email] ]
    
    });

   }

  ngOnInit() {


  }

  crearUsuario(){

    if( this.registroForma.invalid  ) { return;}

    Swal.fire({
      title: 'Please, wait...',
      didOpen: () => {

        Swal.showLoading()

      }});

     const { nombre, correo, password  } = this.registroForma.value;
     
     this.authService.crearUsuario( nombre, correo, password )
        .then ( credenciales => {
          
          Swal.close();

          this.router.navigateByUrl( '/' );

        }).catch(err => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        }));

  }

}
