import { handleResponse, requestOptions } from '@/_helpers';

export const paymentService = { getPaymentPPPoE, postPaymentPPPoE };

function getPaymentPPPoE(id, limit) {
    return fetch(`http://localhost:3031/api/payment/pppoe?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse);
}

function postPaymentPPPoE(id_pppoe, value) {
    return fetch(`http://localhost:3031/api/payment/pppoe`, requestOptions.post({ id_pppoe, value })).then(handleResponse); 
}