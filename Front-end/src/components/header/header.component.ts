import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TablaRegistrosComponent } from '../tu-registro/tabla-registros.component';
import { FicharComponent } from '../fichar/fichar.component';
import { FooterComponent } from '../footer/footer.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  logoutActiveUser,
  setActiveUser,
} from '../../app/actions/activeUser.actions';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    TablaRegistrosComponent,
    FicharComponent,
    FooterComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private store = inject(Store);
  decodedUser?: any;
  mesActual: number = new Date().getMonth() + 1;

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.store.dispatch(setActiveUser())
      this.store
        .select('activeUser')
        .pipe(take(1))
        .subscribe((user) => (this.decodedUser = user));
    }
  }


  constructor(private router: Router) { }

  logOut() {
    this.store.dispatch(logoutActiveUser());
    if (!localStorage.getItem('token')) {
      this.router.navigate(['']);
    }
  }
}
