import { handleResponse, requestOptions } from '@/_helpers';

export const kabupatenService = {
    searchAll
};

function searchAll(name) {
    return fetch(`http://localhost:3000/api/kabupaten?keyword=${name}`, requestOptions.get())
        .then(handleResponse);
}