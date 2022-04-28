import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOCAL_CART } from 'src/environments/environment';
import { IProduct } from '../../../models/product.model';
import { AddToCart, RemoveFromCart } from '../store/products.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct = {} as IProduct;

  constructor(private store: Store<{ items: [], cart: [] }>) { }

  inCart: boolean = false;

  ngOnInit() {
    const localCart = localStorage.getItem(LOCAL_CART);
    this.inCart = !!localCart && !!JSON.parse(localCart).find((c: IProduct) => c.id === this.product.id)
  }

  addToCart(item: IProduct) {
    this.store.dispatch(AddToCart(item));
    this.inCart = true;
  }

  removeFromCart(item: IProduct) {
    this.store.dispatch(RemoveFromCart(item));
    this.inCart = false;
  }
}
