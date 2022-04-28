import { Action, createAction, props } from "@ngrx/store";
import { IProduct } from "../../../models/product.model";

export enum ActionTypes {
    Add = '[Guitars] Add to cart',
    Remove = '[Guitars] Remove from cart',
    LoadItems = '[Guitars] Load items from server',
    LoadSuccess = '[Guitars] Load success',
}

export const AddToCart = createAction(
    ActionTypes.Add,
    props<IProduct>()
);

export const RemoveFromCart = createAction(
    ActionTypes.Remove,
    props<IProduct>()
);

export const GetItems = createAction(
    ActionTypes.LoadItems
);

export const LoadItems = createAction(
    ActionTypes.LoadSuccess,
    props<{ payload: IProduct[] }>()
);

