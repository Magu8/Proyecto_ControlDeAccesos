import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WorkersServiceService } from '../../services/workersService/workers-service.service';
import { catchError, filter, map, mergeMap, of, take, tap } from 'rxjs';
import {
  failActiveUser,
  logActiveUser,
  setActiveUser,
} from '../actions/activeUser.actions';
import { Router } from '@angular/router';

@Injectable()
export class WorkerEffects {
  logIntoAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logActiveUser),
      mergeMap((action) =>
        this.workersService.login(action.login).pipe(
          map((response) => {
            localStorage.setItem('token', response.access_token);
            return setActiveUser();
          }),
          catchError((error) => of(failActiveUser({ error })))
        )
      ),
      tap((action) => {
        if (action.type === '[Worker Service] Login Success') {
          this.router.navigate(['/header']);
        }
      })
    )
  );
  constructor(
    private actions$: Actions,
    private workersService: WorkersServiceService,
    private router: Router
  ) {}
}
