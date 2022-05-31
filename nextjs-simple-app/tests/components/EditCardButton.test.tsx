import '@testing-library/jest-dom';
import { render, screen } from 'tests/components/test-utils';
import userEvent from '@testing-library/user-event';

import EditCardButton from 'components/EditCardButton';

jest.mock('components/modals/EditProductModal', () => {
    const mockedComponent = () => <div data-testid="edit-form"></div>;
    return mockedComponent;
});

import EditProductModal from 'components/modals/EditProductModal';

describe('Tests for EditCardButton component', () => {
    test('if EditCardButton is rendered', () => {
        render(<EditCardButton productId="1" />);

        expect(screen.getByTestId('edit-card-button')).toBeInTheDocument();
    });

    test('if EditProductModal is rendered when EditCardButton is clicked', async () => {
        const user = userEvent.setup();
        render(<EditCardButton productId="1" />);

        await user.click(screen.getByTestId('edit-card-button'));

        expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    });
});
