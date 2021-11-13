import { handleResponse, requestOptions } from '@/_helpers';

export const promoService = { get };

function get(id, limit) {
    return fetch(`http://localhost:3031/api/promo?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse);
}