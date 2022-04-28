import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShopReducer } from './store/products.reducer';
import { ShopEffects } from './store/products.effects';
import { LottieModule } from 'ngx-lottie';
import { RouterModule, Routes } from '@angular/router';
import player from 'lottie-web';

const playerFactory = () => player;

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LottieModule.forRoot({ player: playerFactory }),
    StoreModule.forFeature('products', ShopReducer),
    EffectsModule.forFeature([ShopEffects]),
  ],
  exports: [

  ],
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductListComponent
  ]
})
export class ProductsModule { }
