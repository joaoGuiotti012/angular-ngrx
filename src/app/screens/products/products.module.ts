import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShopReducer } from '../../states/product/products.reducer';
import { ShopEffects } from '../../states/product/products.effects';
import { LottieModule } from 'ngx-lottie';
import { RouterModule, Routes } from '@angular/router';
import player from 'lottie-web';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TOAST_CONFIG } from 'src/environments/environment';

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
    ToastrModule.forRoot(TOAST_CONFIG),
    NgbModule,
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
