import { Injectable } from '@angular/core';

import 'firebase/firestore';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'
import { Usuario } from '../Models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth,
              private fireStore: AngularFirestore) { }


  initAuthListener(){

    this.auth.authState.subscribe( fuser => {
      console.log( fuser );
      console.log( fuser?.uid );
      console.log( fuser?.email );
    });
  }

  crearUsuario(nombre: string, email: string, password: string ) {

    return this.auth.createUserWithEmailAndPassword( email, password )
                .then( ({ user }) => {

                  const newUser = new Usuario( user?.uid!, nombre, email );

                return this.fireStore.doc(`${ user?.uid }/usuario`)
                      .set({ ...newUser })

                });
    
    //console.log( {  nombre, email, password } );
  }


  iniciarSesion(email: string, password: string ) {

    return this.auth.signInWithEmailAndPassword( email, password );
    
    //console.log( {  nombre, email, password } );
  }

  logout(){

    return this.auth.signOut();

  }

  isAuth(){
    return this.auth.authState.pipe(
      map( fuser => fuser!= null )
    )
  }

}
