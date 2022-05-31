import '@testing-library/jest-dom';
import { render, screen } from 'tests/components/test-utils';

import ProductInfoPage from 'pages/products/[productId]';

describe('Tests for product info page', () => {
    const product = {
        _id: '1',
        brand: 'Lenovo',
        model: 'Legion',
        price: 1440,
        rating: 9,
        image: 'https://www.laptop.bg/system/images/132581/original/Legion_Y520.jpg',
    };

    test('if product details are rendered', () => {
        render(<ProductInfoPage product={product} />);

        expect(
            screen.getByText(`${product.brand} ${product.model}`)
        ).toBeInTheDocument();
        expect(screen.getAllByAltText('laptop').length).not.toBe(0);
    });
});
