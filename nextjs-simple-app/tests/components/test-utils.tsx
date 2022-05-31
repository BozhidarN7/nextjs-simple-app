import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import productsReducer from 'features/productsSlice';

const render = (
    ui: ReactElement,
    {
        store = configureStore({
            reducer: { products: productsReducer },
        }),
        ...renderOptions
    } = {}
) => {
    const Wrapper = ({ children }: any) => {
        return <Provider store={store}>{children}</Provider>;
    };

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';

export { render };
