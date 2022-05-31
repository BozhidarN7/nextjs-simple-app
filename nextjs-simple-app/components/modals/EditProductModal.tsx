import EditProductForm from 'components/forms/EditProductForm';
import Modal from 'components/modals/Modal';

type Props = {
    open: boolean;
    productId: string;
    closeModalHandler: (e: React.SyntheticEvent | null) => void;
};

const EditProductModal = ({ open, productId, closeModalHandler }: Props) => {
    return (
        <Modal open={open} closeModalHandler={closeModalHandler}>
            <div
                className={`flex w-[35rem] flex-col items-center justify-center bg-white transition-all duration-300 ease-in-out
                    ${open ? 'translate-y-0' : '-translate-y-20'} rounded-lg`}
                onClick={(e) => e.stopPropagation()}
            >
                <EditProductForm
                    closeModalHandler={closeModalHandler}
                    productId={productId}
                />
            </div>
        </Modal>
    );
};

export default EditProductModal;
