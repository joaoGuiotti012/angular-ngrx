
import { AuthService } from './../../services/auth.service';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess,
  loginWithGoogle,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { setErrorMessage, setLoadingSpinner } from '../Shared/shared.actions';
import { User } from 'src/app/models/user.model';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { isAuthenticatedByGoogle } from './auth.selector';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<any>,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => this.authService.login(action.email, action.password).pipe(
        map((data) => {
          this.store.dispatch(setLoadingSpinner({ status: false }));
          const user = this.authService.formatUser(data);
          this.authService.setUserInLocalStorage(user);
          return loginSuccess({ user, redirect: true });
        }),
        catchError((errResp) => {
          this.store.dispatch(setLoadingSpinner({ status: false }));
          const errorMessage = this.authService.getErrorMessage(
            errResp.error.error.message
          );
          return of(setErrorMessage({ message: errorMessage }));
        })
      )
      )
    );
  });

  loginWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginWithGoogle),
      exhaustMap((action) => this.authService.loginWithGoogle(action)
        .pipe(
          map((user: User) => {
            this.authService.setUserInLocalStorage(user);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loginSuccess({ user, redirect: true, loggedWithGoogle: true });
          })
        )
      )
    )
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['']);
          }
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage() as User;
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          if (this.store.select(isAuthenticatedByGoogle))
            this.socialAuthService.signOut(true);
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );
}
