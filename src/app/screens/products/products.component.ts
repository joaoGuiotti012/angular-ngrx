import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnimationOptions } from 'ngx-lottie';
import { map, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { GetItems } from './store/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  bannersIndex = [1, 2, 3, 4];
  products$!: Observable<IProduct[]>;

  constructor(private store: Store<any>) {
    console.log('teste');
    
    this.products$ = store.select('products').pipe(map((state: any) => state.items));
  }

  ngOnInit(): void {
    this.store.dispatch(GetItems());
  }

  options: AnimationOptions = {
    path: '/assets/animations/loading.json',
  };
 

}
