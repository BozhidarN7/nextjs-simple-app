import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { render, screen } from 'tests/components/test-utils';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';

import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

jest.mock('components/EditCardButton', () => {
    const mockedComponent = () => <div />;
    return mockedComponent;
});

import Card from 'components/Card';

describe('Tests for Card component', () => {
    const product = {
        _id: '1',
        brand: 'Lenovo',
        model: 'Legion',
        price: 1440,
        rating: 9,
        image: 'https://www.laptop.bg/system/images/132581/original/Legion_Y520.jpg',
    };

    beforeEach(() => {
        mockRouter.setCurrentUrl('/');
    });

    test('if product data is displayed', () => {
        render(<Card product={product} />);

        expect(
            screen.getByAltText(`${product.brand} ${product.model}`)
        ).toBeInTheDocument();
        expect(screen.getByText(`Brand: ${product.brand}`)).toBeInTheDocument();
        expect(screen.getByText(`Model: ${product.model}`)).toBeInTheDocument();
        expect(
            screen.getByText(`Price: $${product.price}`)
        ).toBeInTheDocument();
        expect(
            screen.getByText(`Rating: ${product.rating}`)
        ).toBeInTheDocument();
    });

    test('if product info is open when product card clicked', async () => {
        const { result } = renderHook(() => useRouter());
        const user = userEvent.setup();
        render(<Card product={product} />);

        await user.click(screen.getByTestId('card-container'));

        expect(result.current).toMatchObject({
            asPath: `/products/${product._id}`,
        });
    });
});
