import { useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { getAllProducts, getProduct } from 'services/productsService';
import { ProductInterface } from 'interfaces/productInterface';

type Props = {
    product: ProductInterface;
};

const images = [
    'https://www.laptop.bg/system/images/132581/original/Legion_Y520.jpg',
    'https://www.laptop.bg/system/images/132585/normal/Legion_Y520.jpg',
    'https://www.laptop.bg/system/images/132579/normal/Legion_Y520.jpg',
    'https://www.laptop.bg/system/images/132584/normal/Legion_Y520.jpg',
    'https://www.laptop.bg/system/images/132583/normal/Legion_Y520.jpg',
    'https://www.laptop.bg/system/images/132580/normal/Legion_Y520.jpg',
];

const ProductInfoPage = ({ product }: Props) => {
    const [translate, setTranslate] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(product?.image);

    const translateImagesHandler = () => {
        if (translate) {
            setTranslate(false);
        } else {
            setTranslate(true);
        }
    };

    const changeImageHandler = (image: string, index: number) => {
        setCurrentImage(image);
        setImageIndex(index);
    };

    if (!product) {
        return null;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="mt-4 w-9/12">
                <div className="w-4/12">
                    <h1 className="text-3xl font-bold">{`${product.brand} ${product.model}`}</h1>

                    <Zoom>
                        <div>
                            <Image
                                src={currentImage}
                                alt="laptop"
                                width={500}
                                height={400}
                            />
                        </div>
                    </Zoom>
                    <div className="grid grid-flow-col grid-rows-1">
                        <div className="grid grid-flow-col grid-rows-1 gap-x-5 overflow-hidden pt-3">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={changeImageHandler.bind(
                                        null,
                                        image,
                                        index
                                    )}
                                    className={`relative h-[100px] w-[130px] cursor-pointer duration-300 hover:border-2 hover:border-black hover:duration-[0ms] ${
                                        translate
                                            ? `-translate-x-[340%]`
                                            : 'translate-x-[0%]'
                                    } ${
                                        imageIndex === index
                                            ? 'border-2 border-black'
                                            : ''
                                    }`}
                                >
                                    {currentImage === image ? (
                                        <span className="absolute -top-5 left-[50%] translate-x-[-50%]">
                                            &#x25B2;
                                        </span>
                                    ) : null}

                                    <Image
                                        src={image}
                                        alt="laptop"
                                        width={130}
                                        height={100}
                                    />
                                </div>
                            ))}
                        </div>
                        {translate ? (
                            <div
                                onClick={translateImagesHandler}
                                className="cursor-pointer self-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div
                                onClick={translateImagesHandler}
                                className="cursor-pointer self-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const data = await getAllProducts();

    if (!data || !data.data || !data.data.products) {
        return { paths: [], fallback: false };
    }

    const paths = data.data.products.map((product: ProductInterface) => ({
        params: { productId: product._id },
    }));

    return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
    if (!context || !context.params || !context.params.productId) {
        return {
            props: {
                product: null,
            },
        };
    }

    const data = await getProduct(context.params.productId.toString());
    return {
        props: {
            product: data.data.product,
        },
    };
};

export default ProductInfoPage;
