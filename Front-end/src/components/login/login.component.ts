import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../model/login';
import { Store } from '@ngrx/store';
import { logActiveUser } from '../../app/actions/activeUser.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //cambios de Maria para cambiar el nombre de las variables
  rellenaCampos: boolean = true;
  UsuarioContraErroneo: boolean = true;

  login: Login = {
    username: '',
    password: '',
  };

  private store = inject(Store);

  ngOnInit() {
    this.store.select('activeUser').subscribe((user) => {});
    if (localStorage.getItem('token')) {
      this.router.navigate(['/header']);
    }
  }
  //cambios de Maria para sintetizar el Login

  constructor(private router: Router) {}

  workerLogin(login: Login) {
    if (login.username == '' || login.password == '') {
      this.rellenaCampos = false;
      this.UsuarioContraErroneo = true;
    } else {
      this.store.dispatch(logActiveUser({ login: { ...this.login } }));
      if (!localStorage.getItem('token')) {
        this.rellenaCampos = true;
        this.UsuarioContraErroneo = false;
      } else {
        this.rellenaCampos = true;
        this.UsuarioContraErroneo = true;
      }
    }
  }
}
