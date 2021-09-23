import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../Models/ingreso.egreso.model';

export const unSetItems = createAction('[Ingresogreso] Unset Items');

export const setItems = createAction(
    
    '[Ingresogreso] setItems',
    props <{ items: IngresoEgreso[]  }>()

    );
