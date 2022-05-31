import Card from './Card';
import AddNewProductButton from 'components/AddNewProductButton';
import { ProductInterface } from 'interfaces/productInterface';
import { useAppSelector } from 'app/hooks';

const CardsContainer = () => {
    const products = useAppSelector((state) => state.products.products);

    return (
        <div className="grid w-9/12 grid-cols-3 gap-y-10 gap-x-16">
            <AddNewProductButton />
            {products.map((product: ProductInterface) => (
                <Card product={product} key={product._id} />
            ))}
        </div>
    );
};

export default CardsContainer;
