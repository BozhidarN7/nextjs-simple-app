import EditProductModal from './modals/EditProductModal';
const AddNewProductButton = () => {
    return (
        <div className="pointer flex cursor-pointer items-center justify-center shadow-lg duration-500 hover:scale-105">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
    );
};

export default AddNewProductButton;
