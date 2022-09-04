import { handleResponse, requestOptions } from '@/_helpers';

export const resellerService = { get, save };

function get(id, limit) {
    return fetch(`${process.env.VUE_APP_URL}/api/reseller/list?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse);
}

function save(name, phone, information) {
    return fetch(`${process.env.VUE_APP_URL}/api/reseller/create`, requestOptions.post({ name, phone, information })).then(handleResponse)
}
