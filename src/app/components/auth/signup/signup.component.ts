import { FormGroup, FormControl, Validators, AbstractControlOptions } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/states/Shared/shared.actions';
import { signupStart } from 'src/app/states/auth/auth.actions';
import { MustMatchValidator } from './MustMatch.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {
      validators: MustMatchValidator.MustMatch('password', 'confirmPassword')
    }
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(['', [Validators.required]])
    }, formOptions);
  }

  onSignUpSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password }));
  }

  
  get f(): any {
    return this.signUpForm as FormGroup;
  }

  control(controlName: string) {
    return this.signUpForm.get(controlName) as FormGroup;
  }

  isInvalidControl(controlName: string) {
    return this.f.get(controlName)?.errors && this.f.get(controlName)?.touched;
  }

}
