import { handleResponse, requestOptions } from '@/_helpers';

export const packageService = { get };

function get(id, limit) {
    return fetch(`http://localhost:3031/api/package?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse);
}