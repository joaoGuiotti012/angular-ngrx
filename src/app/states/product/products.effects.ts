import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { LOCAL_CART } from "src/environments/environment";
import { GuitarService } from "../../services/guitar.service";
import { setLoadingSpinner } from "../Shared/shared.actions";
import { ActionTypes } from "./products.actions";

@Injectable()
export class ShopEffects {
    constructor(
        private actions$: Actions,
        private guitarService: GuitarService,
        private store: Store<any>,
    ) { }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LoadItems),
            mergeMap(() => this.guitarService.getAll().pipe(
                map((products: any) => {
                    this.store.dispatch(setLoadingSpinner({ status: false }));
                    return {
                        type: ActionTypes.LoadSuccess,
                        payload: products
                    }
                }),
                catchError(() => {
                    this.store.dispatch(setLoadingSpinner({ status: false }));
                    return EMPTY;
                })
            )
            )
        )
    )

}