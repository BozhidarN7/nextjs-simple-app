import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import CardsContainer from 'components/CardsContainer';
import LandingSection from 'components/LandingSection';
import usePageScroll from 'hooks/usePageScroll';
import { ProductInterface } from 'interfaces/productInterface';
import { useAppDispatch } from 'app/hooks';
import { productsLoaded } from 'features/productsSlice';
import { getAllProducts } from 'services/productsService';

type Props = {
    products: ProductInterface[];
};

const Home: NextPage<Props> = ({ products }: Props) => {
    const dispatch = useAppDispatch();
    const { pageScroll } = usePageScroll();

    useEffect(() => {
        dispatch(productsLoaded(products));
    }, []);

    useEffect(() => {
        window.scrollTo({ top: pageScroll, left: 0, behavior: 'smooth' });
    }, [pageScroll]);

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

    if (!data || !data.data || !data.data.products) {
        return {
            props: {
                products: [],
            },
        };
    }

    return {
        props: {
            products: data.data.products,
        },
    };
}

export default Home;
