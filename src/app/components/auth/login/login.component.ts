import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { User } from 'src/app/models/user.model';
import { loginStart, loginWithGoogle } from 'src/app/states/auth/auth.actions';
import { setErrorMessage, setLoadingSpinner } from 'src/app/states/Shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentYear = new Date().getFullYear();

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private store: Store<any>,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onLoginSubmit(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }

  onLoginWithGoogle(): void {

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((user: SocialUser) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        this.store.dispatch(loginWithGoogle(user));
      }).catch((err) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        if (err.error === 'popup_closed_by_user') return;
        setErrorMessage({ message: `Google autenticator error: ${err.error}` })
      });
  }
}
