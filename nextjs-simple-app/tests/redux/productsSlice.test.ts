import { AnyAction } from '@reduxjs/toolkit';
import reducer, {
    productsLoaded,
    productUpdated,
} from 'features/productsSlice';

describe('Tests for productSlice', () => {
    test('if initial state is returned', () => {
        const initialState = reducer(undefined, {} as AnyAction);

        expect(typeof initialState).toBe('object');
        expect(initialState).toEqual({ products: [] });
    });

    test('if products are loaded correctly in state', () => {
        const initialState = { products: [] };

        expect(
            reducer(
                initialState,
                productsLoaded([
                    {
                        _id: '1',
                        brand: 'Lenovo',
                        model: 'Legion',
                        price: 1440,
                        rating: 9,
                        image: 'https://www.laptop.bg/system/images/132581/original/Legion_Y520.jpg',
                    },
                ])
            )
        ).toEqual({
            products: [
                {
                    _id: '1',
                    brand: 'Lenovo',
                    model: 'Legion',
                    price: 1440,
                    rating: 9,
                    image: 'https://www.laptop.bg/system/images/132581/original/Legion_Y520.jpg',
                },
            ],
        });
    });

    test('if productsUpdate updates product correctly', () => {
        const previousState = {
            products: [
                {
                    _id: '1',
                    brand: 'Lenovo',
                    model: 'Legion',
                    price: 1440,
                    rating: 9,
                    image: 'https://www.laptop.bg/system/images/132581/original/Legion_Y520.jpg',
                },
            ],
        };

        expect(
            reducer(
                previousState,
                productUpdated({
                    _id: '1',
                    brand: 'HP',
                    model: 'Legion',
                    price: 1440,
                    rating: 9,
                    image: 'https://www.laptop.bg/system/images/132581/original/Legion_Y520.jpg',
                })
            ).products[0].brand
        ).toEqual('HP');
    });
});
