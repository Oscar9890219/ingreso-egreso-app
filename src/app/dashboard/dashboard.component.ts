import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {


  userSubs: Subscription;
  ingresoSubs: Subscription;

  constructor(private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }


  ngOnInit(): void {

    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }) => {

        this.ingresoSubs = this.ingresoEgresoService.initIngresosEgresosListerner(user.uid)
          .subscribe(ingresoEgresosFB => {

            this.store.dispatch(setItems({ items: ingresoEgresosFB }))

          })

      });
  }
  ngOnDestroy(): void {

    this.userSubs.unsubscribe();
    this.ingresoSubs.unsubscribe();

  }

}
