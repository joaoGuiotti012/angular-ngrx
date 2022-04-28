import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
