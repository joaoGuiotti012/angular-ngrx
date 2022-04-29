import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AnimationOptions } from 'ngx-lottie';
import { map, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { GetItems } from '../../states/product/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  bannersImage = [1, 2, 3, 4].map((n) => `/assets/images/banner${n}.jpg`);

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  products$!: Observable<IProduct[]>;

  constructor(private store: Store<any>) {
    console.log('teste');
    
    this.products$ = store.select('products').pipe(map((state: any) => state.items));
  }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  ngOnInit(): void {
    this.store.dispatch(GetItems());
  }

  options: AnimationOptions = {
    path: '/assets/animations/loading.json',
  };
 
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
