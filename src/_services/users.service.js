import { handleResponse, requestOptions } from '@/_helpers';

export const userService = {
    getAll,
    getById
};

// const local = 'localhost'
const local = '7.11.92.2'

function getAll() {
    return fetch(`http://${local}:3131/api/pegawai`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`http://${local}:3000/api/pegawai/${id}`, requestOptions.get())
        .then(handleResponse); 
}