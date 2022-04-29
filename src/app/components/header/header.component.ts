import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { autoLogout } from 'src/app/states/auth/auth.actions';
import { isAuthenticated } from 'src/app/states/auth/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth = false;

  cart$!: Observable<IProduct[]>;
  isAuth$: Observable<boolean>;
  user$!: Observable<any>;

  constructor(private store: Store<any>) {
    this.cart$ = store.select('products').pipe(map((state) => state.cart));
    this.isAuth$ = this.store.select(isAuthenticated);
    this.user$ = this.store.select('auth').pipe(map((state) => state.user));
  }

  ngOnInit(): void { }

  logout() {
    this.store.dispatch(autoLogout())
  }

}
