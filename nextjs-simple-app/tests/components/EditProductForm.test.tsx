import '@testing-library/jest-dom';
import { render, screen, fireEvent } from 'tests/components/test-utils';
import * as productService from 'services/productsService';

import * as reduxHooks from 'app/hooks';
import EditProductForm from 'components/forms/EditProductForm';

describe('Tests for EditProductForm component', () => {
    const useAppSelectorMock = jest.spyOn(reduxHooks, 'useAppSelector');
    const useAppDispatchMocked = jest.spyOn(reduxHooks, 'useAppDispatch');
    const product = {
        _id: '1',
        brand: 'Lenovo',
        model: 'Legion',
        price: 1440,
        rating: 9,
        image: 'https://www.laptop.bg/system/images/132581/original/Legion_Y520.jpg',
    };

    beforeEach(() => {
        useAppSelectorMock.mockClear();
        useAppDispatchMocked.mockClear();
    });

    test('if render edit form', () => {
        useAppSelectorMock.mockReturnValue([product]);

        render(<EditProductForm productId="1" closeModalHandler={() => {}} />);

        const brandInput = screen.getByPlaceholderText('Brand');
        const modelInput = screen.getByPlaceholderText('Model');
        const imageInput = screen.getByPlaceholderText('Image');
        const priceInput = screen.getByPlaceholderText('Price');
        const ratingInput = screen.getByPlaceholderText('Rating');

        expect(brandInput).toBeInTheDocument();
        expect(modelInput).toBeInTheDocument();
        expect(imageInput).toBeInTheDocument();
        expect(priceInput).toBeInTheDocument();
        expect(ratingInput).toBeInTheDocument();
    });

    test('if input fielsd are filled with correct valued', () => {
        useAppSelectorMock.mockReturnValue([product]);
        render(<EditProductForm productId="1" closeModalHandler={() => {}} />);

        const brandInput = screen.getByPlaceholderText(
            'Brand'
        ) as HTMLInputElement;
        const modelInput = screen.getByPlaceholderText(
            'Model'
        ) as HTMLInputElement;
        const imageInput = screen.getByPlaceholderText(
            'Image'
        ) as HTMLInputElement;
        const priceInput = screen.getByPlaceholderText(
            'Price'
        ) as HTMLInputElement;
        const ratingInput = screen.getByPlaceholderText(
            'Rating'
        ) as HTMLInputElement;

        expect(brandInput.value).toEqual(product.brand);
        expect(modelInput.value).toEqual(product.model);
        expect(imageInput.value).toEqual(product.image);
        expect(Number(priceInput.value)).toEqual(product.price);
        expect(Number(ratingInput.value)).toEqual(product.rating);
    });

    test('if form title is rendered', () => {
        useAppSelectorMock.mockReturnValue([product]);
        render(<EditProductForm productId="1" closeModalHandler={() => {}} />);

        expect(screen.getByText('Edit product')).toBeInTheDocument();
    });

    test('if inputs value is change when user type', () => {
        useAppSelectorMock.mockReturnValue([product]);
        render(<EditProductForm productId="1" closeModalHandler={() => {}} />);

        const brandInput = screen.getByPlaceholderText(
            'Brand'
        ) as HTMLInputElement;
        const modelInput = screen.getByPlaceholderText(
            'Model'
        ) as HTMLInputElement;
        const imageInput = screen.getByPlaceholderText(
            'Image'
        ) as HTMLInputElement;
        const priceInput = screen.getByPlaceholderText(
            'Price'
        ) as HTMLInputElement;
        const ratingInput = screen.getByPlaceholderText(
            'Rating'
        ) as HTMLInputElement;

        fireEvent.change(brandInput, { target: { value: 'HP' } });
        fireEvent.change(modelInput, { target: { value: 'HP Model' } });
        fireEvent.change(imageInput, { target: { value: 'Image' } });
        fireEvent.change(priceInput, { target: { value: 1000 } });
        fireEvent.change(ratingInput, { target: { value: 10 } });

        expect(brandInput.value).toBe('HP');
        expect(modelInput.value).toBe('HP Model');
        expect(imageInput.value).toBe('Image');
        expect(Number(priceInput.value)).toBe(1000);
        expect(Number(ratingInput.value)).toBe(10);
    });

    test('if spinner is shown when product is null', () => {
        useAppSelectorMock.mockReturnValue([product]);
        render(<EditProductForm productId="0" closeModalHandler={() => {}} />);

        const spinnerWrapper = screen.getByTestId('spinner-wrapper');

        expect(spinnerWrapper).toBeInTheDocument();
    });

    test('if product data is change on submit', async () => {
        useAppSelectorMock.mockReturnValue([product]);

        const mockedDispatch = jest.fn();
        useAppDispatchMocked.mockReturnValue(mockedDispatch);

        render(<EditProductForm productId="1" closeModalHandler={() => {}} />);

        const editProductMock = jest.spyOn(productService, 'editProduct');
        editProductMock.mockReturnValue(
            Promise.resolve({ data: { product: { ...product, brand: 'HP' } } })
        );

        const brandInput = screen.getByPlaceholderText(
            'Brand'
        ) as HTMLInputElement;
        const editProductButton = screen.getByText('Edit');

        fireEvent.change(brandInput, { target: { value: 'HP' } });
        fireEvent.click(editProductButton);

        expect(editProductMock).toHaveBeenCalled();
        expect(brandInput.value).toBe('HP');

        editProductMock.mockClear();
    });
});
