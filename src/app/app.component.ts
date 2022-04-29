import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { autoLogin } from './states/auth/auth.actions';
import { isAuthenticated } from './states/auth/auth.selector';
import { getErrorMessage, getLoading } from './states/Shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'angular-ngrx-store';

  isAuthenticated$!: Observable<boolean>;
  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }

  ngOnInit(): void {

  }
}
