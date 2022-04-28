import { createReducer, on } from "@ngrx/store";
import { IProduct } from "src/app/models/product.model";
import {
    AddToCart,
    LoadItems,
    RemoveFromCart
} from "./products.actions";

export const initialState: { items: IProduct[], cart: IProduct[] } = {
    items: [],
    cart: [],
}

export const ShopReducer = createReducer(
    initialState,
    on(LoadItems, (state, action) => ({
        ...state,
        items: [...action.payload]
    })),
    on(AddToCart, (state, item: IProduct) => ({
        ...state,
        cart: [...state.cart, item]
    })),
    on(RemoveFromCart, (state, item) => ({
        ...state,
        cart: [
            ...state.cart.filter((_item: any) => _item.name !== item.name)
        ]
    })),
);
