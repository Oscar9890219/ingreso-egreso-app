import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'
import { Usuario } from '../Models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actions from '../auth/auth.actions';
import { Subscription } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(public auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private store: Store<AppState>) { }


  initAuthListener() {

    this.auth.authState.subscribe(fuser => {
      console.log(fuser);

      if (fuser) {

        console.log('Entro fuser');

        this.userSubscription = this.fireStore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {

            console.log({ firestoreUser });


            const user = Usuario.fromFirebase(firestoreUser);
            this.store.dispatch(actions.setUser({ user }));

          });

      } else {

        console.log('NO Entro fuser');
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }

        this.store.dispatch(actions.unSetUser());

      }


    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {

        const newUser = new Usuario(user.uid, nombre, email);

        return this.fireStore.doc(`${user.uid}/usuario`)
          .set({ ...newUser })

      });

    //console.log( {  nombre, email, password } );
  }


  iniciarSesion(email: string, password: string) {

    return this.auth.signInWithEmailAndPassword(email, password);

    //console.log( {  nombre, email, password } );
  }

  logout() {

    return this.auth.signOut();

  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fuser => fuser != null)
    )
  }

}
