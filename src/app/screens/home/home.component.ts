import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IProduct } from '../../models/product.model';
import { GetItems } from '../../screens/products/store/products.actions';
import { map, Observable } from 'rxjs';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bannersIndex = [1, 2, 3, 4];
  products$!: Observable<IProduct[]>;

  constructor(private store: Store<any>) {
    this.products$ = store.select('shop').pipe(map((state: any) => state));
  }

  ngOnInit(): void {
    this.store.dispatch(GetItems());
  }

  options: AnimationOptions = {
    path: '/assets/animations/loading.json',
  };
 
}
