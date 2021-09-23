import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  userName: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('user')
      .pipe(
        filter(({ user }) => user != null)
      )
      .subscribe(({ user }) =>  this.userName = user.nombre );

  }


  logout() {

    this.authService.logout()
      .then(resp => {
        this.router.navigateByUrl('/login');
      })

  }

}
