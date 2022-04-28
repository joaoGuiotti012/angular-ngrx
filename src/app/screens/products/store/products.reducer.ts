import { createReducer, on } from "@ngrx/store";
import { IProduct } from "src/app/models/product.model";
import { LOCAL_CART } from "src/environments/environment";
import {
    AddToCart,
    LoadItems,
    RemoveFromCart
} from "./products.actions";

export const initialState = (): { items: IProduct[], cart: IProduct[] } => {
    const local_cart = localStorage.getItem(LOCAL_CART);
    return {
        items: [],
        cart: !!local_cart ? [...JSON.parse(local_cart)] : [],
    }
}

export const ShopReducer = createReducer(
    initialState(),
    on(LoadItems, (state, action) => ({
        ...state,
        items: [...action.payload],
    })),
    on(AddToCart, (state, item: IProduct) => {
        const newListProds = {
            ...state,
            cart: [...state.cart, item]
        }
        localStorage.setItem(LOCAL_CART, JSON.stringify(newListProds.cart))
        return newListProds;
    }),
    on(RemoveFromCart, (state, item) => {
        const remListProds = {
            ...state,
            cart: [
                ...state.cart.filter((_item: any) => _item.id !== item.id)
            ]
        }
        localStorage.setItem(LOCAL_CART, JSON.stringify(remListProds.cart));
        return remListProds;
    }),
);
