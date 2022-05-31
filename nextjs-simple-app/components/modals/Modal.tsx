import React, { useEffect, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

import EditProductModal from './EditProductModal';

type Props = {
    open: boolean;
    children: React.ReactNode;
    closeModalHandler: (e: React.SyntheticEvent | null) => void;
};

const Modal = ({ open, closeModalHandler, children }: Props) => {
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
                  data-testid="modal-container"
              >
                  {children}
              </div>,

              document.getElementById('editProductPortal')!
          )
        : null;
};

export default Modal;
