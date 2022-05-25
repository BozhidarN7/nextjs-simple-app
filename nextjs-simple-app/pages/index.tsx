import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import CardsContainer from 'components/CardsContainer';
import LandingSection from 'components/LandingSection';
import { ProductInterface } from 'interfaces/productInterface';
import { useAppDispatch } from 'app/hooks';
import { productsLoaded } from 'features/productsSlice';
import { getAllProducts } from 'services/productsService';

type Props = {
    products: ProductInterface[];
};

const Home: NextPage<Props> = ({ products }: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productsLoaded(products));
    }, []);

    return (
        <>
            <Head>
                <title>Laptops</title>
            </Head>
            <div className="flex flex-col items-center justify-center">
                <LandingSection />
                <CardsContainer />
            </div>
        </>
    );
};

export async function getStaticProps() {
    const data = await getAllProducts();

    return {
        props: {
            products: data.data.products,
        },
    };
}

export default Home;
