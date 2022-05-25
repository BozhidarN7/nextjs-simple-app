import React, { useState } from 'react';

import EditProductModal from 'components/modals/EditProductModal';

type Props = {
    productId: string;
};

const EditCardButton = ({ productId }: Props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModalHandler = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setIsOpenModal(true);
    };

    const closeModalHandler = (e: React.SyntheticEvent | null) => {
        if (e) {
            e.stopPropagation();
        }

        setIsOpenModal(false);
    };

    return (
        <>
            <div
                className="z-10 col-start-2 col-end-3 row-start-1 row-end-2 mt-2 mr-2 h-8 w-8 duration-300 hover:rounded-full hover:bg-gray-200 active:bg-gray-300"
                onClick={openModalHandler}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-pink-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </div>
            <EditProductModal
                open={isOpenModal}
                closeModalHandler={closeModalHandler}
                productId={productId}
            />
        </>
    );
};

export default EditCardButton;
