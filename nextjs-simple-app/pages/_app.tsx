import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'app/store';

import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
