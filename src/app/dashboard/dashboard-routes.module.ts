import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { routes } from '../app-routing.module';

const rutasHijas: Routes = [

 { 
        
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        //canActivate: [ AuthGuard ]
            
    },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutasHijas )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
