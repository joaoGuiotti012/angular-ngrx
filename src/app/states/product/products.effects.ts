import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { LOCAL_CART } from "src/environments/environment";
import { GuitarService } from "../../services/guitar.service";
import { ActionTypes } from "./products.actions";

@Injectable()
export class ShopEffects {
    constructor(
        private actions$: Actions,
        private guitarService: GuitarService
    ) { }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LoadItems),
            mergeMap(() =>
                this.guitarService.getAll().pipe(
                    map((products: any) => ({
                        type: ActionTypes.LoadSuccess,
                        payload: products
                    })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

}