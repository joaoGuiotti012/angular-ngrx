import { User } from './../models/user.model';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { autoLogout } from '../states/auth/auth.actions';
import { SocialUser } from 'angularx-social-login';
import { isAuthenticatedByGoogle } from '../states/auth/auth.selector';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<any>) { }

  loginWithGoogle(socialUser: SocialUser): Observable<User> {
    return of(this.formatGoogleUser(socialUser))
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User({
      email: data.email,
      token: data.idToken,
      localId: data.localId,
      expirationDate: expirationDate,
      isAuthByGoolge: false
    });
    return user;
  }

  formatGoogleUser(data: SocialUser): User {
    const user = new User({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      token: data.authToken,
      localId: data.idToken,
      authGoogle: data.authToken,
      photoUrl: data.photoUrl,
      isAuthByGoolge: true
    });
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email n??o encontrado!';
      case 'INVALID_PASSWORD':
        return 'Senha Invalida!';
      case 'EMAIL_EXISTS':
        return 'Email j?? existe na base de dados!';
      default:
        return 'Ocorreu um erro desconhecido, tente novamente mais tarde!';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    let timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User({
        email: userData.email,
        token: userData.token,
        localId: userData.localId,
        expirationDate: expirationDate
      });
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.clear();
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
