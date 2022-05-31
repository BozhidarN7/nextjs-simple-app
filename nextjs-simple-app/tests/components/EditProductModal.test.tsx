import '@testing-library/jest-dom';
import { render, screen } from 'tests/components/test-utils';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom';

import EditProductModal from 'components/modals/EditProductModal';

jest.mock('components/forms/EditProductForm', () => {
    const mockedComponent = () => <div />;
    return mockedComponent;
});

import EditProductForm from 'components/forms/EditProductForm';

describe('Test for EditProdcutModal component', () => {
    beforeEach(() => {
        ReactDOM.createPortal = jest.fn((element, node): any => {
            return element;
        });
    });

    afterEach(() => {
        (ReactDOM.createPortal as jest.Mock).mockClear();
    });

    test('if modal is closed on escape key clicked', async () => {
        const user = userEvent.setup();

        const closeModalHandler = jest.fn();
        render(
            <EditProductModal
                productId="1"
                closeModalHandler={closeModalHandler}
                open={true}
            />
        );

        await user.keyboard('{Escape}');

        expect(closeModalHandler).toHaveBeenCalled();
    });

    test('if modal is closed on overlay clicked', async () => {
        const user = userEvent.setup();

        let open = true;
        const closeModalHandler = jest.fn(() => (open = false));
        render(
            <EditProductModal
                productId="1"
                closeModalHandler={closeModalHandler}
                open={open}
            />
        );

        await user.click(screen.getByTestId('modal-container'));

        expect(closeModalHandler).toBeCalled();
        expect(open).toBe(false);
    });
});
