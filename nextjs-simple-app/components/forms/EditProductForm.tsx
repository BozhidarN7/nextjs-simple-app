import React, { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { editProduct } from 'services/productsService';
import { productUpdated } from 'features/productsSlice';
import { ProductInterface } from 'interfaces/productInterface';
import Spinner from 'components/common/Spinner';
import routes from 'api/apiRoutes';

type Props = {
    productId: string;
    closeModalHandler: (e: React.SyntheticEvent | null) => void;
};

const EditProductForm = ({ closeModalHandler, productId }: Props) => {
    const { mutate } = useSWRConfig();
    const dispatch = useAppDispatch();

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState(0);
    const [price, setPrice] = useState(0);

    const product = useAppSelector((state) => state.products.products).find(
        (product) => product._id === productId
    );

    const editProductHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = await mutate(
            routes.editProductURL(productId),
            editProduct(
                {
                    brand,
                    model,
                    image,
                    rating,
                    price,
                } as ProductInterface,
                productId
            )
        );
        dispatch(productUpdated(data.data.product));
        closeModalHandler(e);
    };

    useEffect(() => {
        if (product) {
            setBrand(product.brand);
            setModel(product.model);
            setImage(product.image);
            setRating(product.rating);
            setPrice(product.price);
        }

        return () => {
            setBrand('');
            setModel('');
            setImage('');
            setRating(0);
            setPrice(0);
        };
    }, [product]);

    if (!product) {
        return (
            <div
                data-testid="spinner-wrapper"
                className="flex h-[25rem] items-center justify-center"
            >
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <h2 className="my-2 text-2xl font-bold">Edit product</h2>
            <form
                onSubmit={editProductHandler}
                className="my-2 grid w-6/12 grid-cols-1 grid-rows-6 gap-y-10"
            >
                <input
                    className="rounded-lg border border-blue-500 p-2 outline-blue-500"
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <input
                    className="rounded-lg border border-blue-500 p-2 outline-blue-500"
                    type="text"
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
                <input
                    className="rounded-lg border border-blue-500 p-2 outline-blue-500"
                    type="text"
                    placeholder="Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    className="rounded-lg border border-blue-500 p-2 outline-blue-500"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <input
                    className="rounded-lg border border-blue-500 p-2 outline-blue-500"
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                />
                <button
                    type="submit"
                    className="active:bg-color-700 w-16 justify-self-center bg-blue-400 p-2 duration-300 hover:bg-blue-500"
                >
                    Edit
                </button>
            </form>
        </>
    );
};

export default EditProductForm;
