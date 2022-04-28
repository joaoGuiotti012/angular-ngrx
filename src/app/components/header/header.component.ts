import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart$!: Observable<IProduct[]>;
  constructor(private store: Store<any>) {
    this.cart$ = store.select('products').pipe(map((state) => state.cart));
  }

  ngOnInit(): void {}

}
