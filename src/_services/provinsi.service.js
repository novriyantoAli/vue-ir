import { handleResponse, requestOptions } from '@/_helpers';

export const provinsiService = {
    searchAll
};

function searchAll(name) {
    return fetch(`http://localhost:3000/api/provinsi?provinsi=${name}`, requestOptions.get())
        .then(handleResponse);
}