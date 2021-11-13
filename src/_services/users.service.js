import { handleResponse, requestOptions } from '@/_helpers';

export const userService = {
    getAll,
    getById
};

function getAll() {
    return fetch(`http://localhost:3000/api/pegawai`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`http://localhost:3000/api/pegawai/${id}`, requestOptions.get())
        .then(handleResponse); 
}