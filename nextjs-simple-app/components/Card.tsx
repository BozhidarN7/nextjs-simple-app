import Image from 'next/image';
import { useRouter } from 'next/router';

import EditCardButton from 'components/EditCardButton';
import { ProductInterface } from 'interfaces/productInterface';

type Props = {
    product: ProductInterface;
};

const Card = ({ product }: Props) => {
    const router = useRouter();
    return (
        <div
            onClick={(e) => router.push(`/products/${product._id}`)}
            className="pointer cursor-pointer shadow-lg duration-500 hover:scale-105"
        >
            <div className="grid grid-cols-1 grid-rows-1">
                <EditCardButton productId={product._id} />
                <div className="row-start-1 row-end-2 self-center justify-self-center">
                    <Image
                        src={product.image}
                        alt="levno legeion"
                        width={320}
                        height={206}
                        priority
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 bg-gray-50 p-2">
                <span>Brand: {product.brand}</span>
                <span className="place-self-end">Model: {product.model}</span>
                <span>Price: ${product.price}</span>
                <span className="place-self-end">Rating: {product.rating}</span>
            </div>
        </div>
    );
};

export default Card;
