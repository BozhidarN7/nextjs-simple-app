export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://nextjs-simple-2adq0yd3o-bozhidarn7.vercel.app/api';

const products = {
    getAllProductsURL: () => `${baseUrl}/products`,
    editProductURL: (productId: string) => `${baseUrl}/products/${productId}`,
    getProductURL: (productId: string) => `${baseUrl}/products/${productId}`,
};

const routes = {
    ...products,
};

export default routes;
