export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://chatappwebapi.azurewebsites.net/api/v1';

const products = {
    getAllProductsURL: () => `${baseUrl}/products`,
    editProductURL: (productId: string) => `${baseUrl}/products/${productId}`,
    getProductURL: (productId: string) => `${baseUrl}/products/${productId}`,
};

const routes = {
    ...products,
};

export default routes;
