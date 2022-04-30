import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store'
import { HomeComponent } from './screens/home/home.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment, TOAST_CONFIG } from '../environments/environment';
import { LottieModule } from 'ngx-lottie';
import { ProductsModule } from './screens/products/products.module';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import player from 'lottie-web';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthTokenInterceptor } from './services/AuthToken.interceptor';
import { appReducer } from './states/app.state';
import { AuthEffects } from './states/auth/auth.effects';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
const playerFactory = () => player;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(TOAST_CONFIG),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    ProductsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    LottieModule.forRoot({ player: playerFactory }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    NgbModule,
    SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('170370376765-ivmv2skpd6hboputnjuk1vclrrhiqtc6.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
