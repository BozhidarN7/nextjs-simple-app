import Image from 'next/image';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import EditCardButton from 'components/EditCardButton';
import usePageScroll from 'hooks/usePageScroll';
import { ProductInterface } from 'interfaces/productInterface';

type Props = {
    product: ProductInterface;
};

const Card = ({ product }: Props) => {
    const router = useRouter();
    const { savePageScrollHanlder } = usePageScroll();

    const openProductInofPageHandler = () => {
        savePageScrollHanlder();
        router.push(`/products/${product._id}`);
    };

    return (
        <div
            onClick={openProductInofPageHandler}
            className="pointer cursor-pointer shadow-lg duration-500 hover:scale-105"
            data-testid="card-container"
        >
            <div className="grid grid-cols-1 grid-rows-1">
                {product ? (
                    <EditCardButton productId={product._id} />
                ) : (
                    <Skeleton circle />
                )}
                <div className="row-start-1 row-end-2 self-center justify-self-center">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={`${product.brand} ${product.model}`}
                            width={320}
                            height={206}
                            priority
                        />
                    ) : (
                        <Skeleton className="h-[206px] w-[320px]" />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 bg-gray-50 p-2">
                {product ? (
                    <>
                        <span>Brand: {product.brand}</span>
                        <span className="place-self-end">
                            Model: {product.model}
                        </span>
                        <span>Price: ${product.price}</span>
                        <span className="place-self-end">
                            Rating: {product.rating}
                        </span>
                    </>
                ) : (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;
