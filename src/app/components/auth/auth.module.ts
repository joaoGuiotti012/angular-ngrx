import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from 'src/app/states/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/states/auth/auth.effects';
import { SignupComponent } from './signup/signup.component';
import { LottieModule } from 'ngx-lottie'; 

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LottieModule, 
    StoreModule.forFeature('auth', AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(routes),
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  providers: []
})
export class AuthModule { }
