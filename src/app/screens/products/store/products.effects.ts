import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { GuitarService } from "../../../services/guitar.service";
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
                    map((guitars) => ({
                        type: ActionTypes.LoadSuccess,
                        payload: guitars
                    })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

}