import React, { useEffect, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

import EditProductForm from 'components/forms/EditProductForm';

type Props = {
    open: boolean;
    productId: string;
    closeModalHandler: (e: React.SyntheticEvent | null) => void;
};

const EditProductModal = ({ open, productId, closeModalHandler }: Props) => {
    const [mounted, setMounted] = useState(false);

    const closeOnEscapeKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModalHandler(null);
            }
        },
        [closeModalHandler]
    );

    useEffect(() => {
        setMounted(true);

        () => {
            setMounted(false);
        };
    }, []);

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown);

        return () =>
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    }, [closeOnEscapeKeyDown]);

    return mounted
        ? ReactDOM.createPortal(
              <div
                  className={`fixed left-0 top-0 right-0 bottom-0 z-10 grid items-center
            justify-center transition-opacity duration-300 ease-in-out
            ${open ? 'bg-[rgba(0,0,0,0.4)]' : 'opacity-0'}
            ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  onClick={closeModalHandler}
              >
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
              </div>,
              document.getElementById('editProductPortal')!
          )
        : null;
};

export default EditProductModal;
