import { handleResponse, requestOptions } from '@/_helpers';

export const promoService = { get };

function get(id, limit) {
    return fetch(`${process.env.VUE_APP_URL}/api/promo?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse);
}