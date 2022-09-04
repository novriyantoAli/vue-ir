import { handleResponse, requestOptions } from '@/_helpers';

export const pppoeService = { get };


function get(id, limit) {
    return fetch(`${process.env.VUE_APP_URL}/api/pppoe?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse);
}

// function getBatch() {
//     return fetch(`http://localhost:3031/api/voucher/batch`, requestOptions.get()).then(handleResponse);
// }

// function getBatchPrint(code) {
//     return fetch(`http://localhost:3031/api/voucher/batch/print?code=${code}`, requestOptions.get())
//         .then(handleResponse);
// }


// function generateBatch(idPromo, idPackage, howMany) {
//     return fetch(`http://localhost:3031/api/voucher/batch`, requestOptions.post({ idPromo, idPackage, howMany })).then(handleResponse);
// }