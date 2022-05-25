import { getOptions, request } from 'api/requester';

export const get = async (url: string) => {
    if (!url) throw new Error('Invalid params in crud.get()');

    const options = await getOptions('get');
    return await request(url, options);
};

export const post = async (url: string, data: any) => {
    if (!url) throw new Error('Invalid params in crud.post()');

    const options = await getOptions('post', data);
    return await request(url, options);
};

export const put = async (url: string, data: any) => {
    if (!url || !data) throw new Error('Invalid params in crud.put()');

    const options = await getOptions('put', data);
    return await request(url, options);
};

export const patch = async (url: string, data: any) => {
    if (!url || !data) throw new Error('Invalid params in crud.patch()');

    const options = await getOptions('patch', data);
    return await request(url, options);
};

export const del = async (url: string) => {
    if (!url) throw new Error('Invalid params in crud.del()');

    const options = await getOptions('delete');
    return await request(url, options);
};
