import { handleResponse, requestOptions } from '@/_helpers';

export const packageService = { get };

function get(id, limit) {
    return fetch(`${process.env.VUE_APP_URL}/api/package?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse);
}