import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Modulos
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
//ngRx

import { environment } from 'src/environments/environment';
import { appReducers } from './app.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


//
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
