import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) {

    this.loginForm = this.fb.group({

      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

    this.uiSubscription =  this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);

  }
  ngOnDestroy(): void {
   
    this.uiSubscription.unsubscribe();

  }

  ngOnInit(): void {
  }


  signIn() {

    if (this.loginForm.invalid) { return; }


    this.store.dispatch(ui.isLoading());


    // Swal.fire({
    //   title: 'Please, wait...',
    //   didOpen: () => {

    //     Swal.showLoading()

    //   }});

    const { email, password } = this.loginForm.value;

    this.authService.iniciarSesion(email, password)
      .then(resp => {

        // Swal.close();

        this.store.dispatch(ui.stopLoading());
        this.router.navigateByUrl('/');
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })

      }
      );

  }

}
