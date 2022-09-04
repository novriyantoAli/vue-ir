import { handleResponse, requestOptions } from '@/_helpers';

export const paymentService = { 
    getPaymentVoucher,
    getPaymentReseller, 
    getPendingPaymentVoucher,
    getPendingPaymentReseller, 
    postPaymentReseller, 
    getPaymentPPPoE, 
    postPaymentPPPoE,
    postPaymentVoucher,
};

function postPaymentVoucher(batch_code, value) {
    return fetch(`${process.env.VUE_APP_URL}/api/payment/voucher`, requestOptions.post({batch_code, value}))
        .then(handleResponse)
}

function getPaymentVoucher(id, limit) {
    return fetch(`${process.env.VUE_APP_URL}/api/payment/voucher?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse)
}

function getPaymentReseller(id, limit) {
    return fetch(`${process.env.VUE_APP_URL}/api/payment/reseller?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse)
}

function getPendingPaymentVoucher() {
    return fetch(`${process.env.VUE_APP_URL}/api/payment/voucher/pending`, requestOptions.get()).then(handleResponse)

}

function getPendingPaymentReseller() {
    return fetch(`${process.env.VUE_APP_URL}/api/payment/reseller/pending`, requestOptions.get())
        .then(handleResponse)
}

function postPaymentReseller(transaction_code, value) {
    return fetch(`${process.env.VUE_APP_URL}/api/payment/reseller`, requestOptions.post({transaction_code, value}))
        .then(handleResponse)
}

function getPaymentPPPoE(id, limit) {
    return fetch(`${process.env.VUE_APP_URL}/api/payment/pppoe?id=${id}&limit=${limit}`, requestOptions.get())
        .then(handleResponse);
}

function postPaymentPPPoE(id_pppoe, value, username, expire) {
    return fetch(`${process.env.VUE_APP_URL}/api/payment/pppoe`, requestOptions.post({ id_pppoe, value, username, expire })).then(handleResponse); 
}