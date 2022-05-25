import routes from 'api/apiRoutes';
import * as requester from 'api/crud';

import { ProductInterface } from 'interfaces/productInterface';

export const getAllProducts = async () => {
    return await requester.get(routes.getAllProductsURL());
};

export const getProduct = async (productId: string) => {
    return await requester.get(routes.getProductURL(productId));
};

export const editProduct = async (
    data: ProductInterface,
    productId: string
) => {
    return await requester.put(routes.editProductURL(productId), data);
};
