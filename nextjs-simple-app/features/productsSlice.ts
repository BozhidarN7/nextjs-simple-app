import { createSlice } from '@reduxjs/toolkit';

import { ProductInterface } from 'interfaces/productInterface';

interface ProductsSliceInterface {
    products: ProductInterface[];
}

const initialState: ProductsSliceInterface = {
    products: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsLoaded(state, action) {
            state.products = action.payload;
        },
        productUpdated(state, action) {
            const product = state.products.find(
                (product) => product._id === action.payload._id
            );
            const productIndex = state.products.indexOf(product!);
            state.products.splice(productIndex, 1, action.payload);
        },
    },
});

export const { productsLoaded, productUpdated } = productsSlice.actions;

export default productsSlice.reducer;
