import { BehaviorSubject } from 'rxjs';

import { handleResponse, requestOptions } from '@/_helpers';
// DEPRECATED
const currentDataPegawaiSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentDataPegawai')));

const currentDataUmumSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentDataUmum'))); 
const currentDataKeluargaSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentDataKeluarga'))); 
const currentDataKontakDaruratSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentDataKontakDarurat')));
const currentDataRiwayatPendidikanSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentDataRiwayatPendidikan')));
const currentDataLokakaryaSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentDataLokakarya')));
const currentDataPengalamanKerjaSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentDataPengalamanKerja')));


export const pegawaiService = {
    getAll,
    getByNIK,
    saveDataUmum,
    saveDataKeluarga,
    saveDataKontakDarurat,
    saveDataRiwayatPendidikan,
    saveDataLokakarya,
    saveDataPengalamanKerja,

    currentDataUmum: currentDataUmumSubject.asObservable(),
    currentDataKeluarga: currentDataKeluargaSubject.asObservable(),
    currentDataKontakDarurat: currentDataKontakDaruratSubject.asObservable(),
    currentDataRiwayatPendidikan: currentDataRiwayatPendidikanSubject.asObservable(),
    currentDataLokakarya: currentDataLokakaryaSubject.asObservable(),
    currentDataPengalamanKerja: currentDataPengalamanKerjaSubject.asObservable(),

    currentDataPegawai: currentDataPegawaiSubject.asObservable(),
    get currentDataUmumValue() { return currentDataUmumSubject.value },
    get currentDataPegawaiValue () { return currentDataPegawaiSubject.value },
};

function getAll() {
    return fetch(`http://localhost:3000/api/pegawai`, requestOptions.get())
        .then(handleResponse);
}

function getByNIK(nik) {
    return fetch(`http://localhost:3000/api/pegawai?nik=${nik}`, requestOptions.get())
        .then(handleResponse); 
}

function saveDataUmum(dataUmum) {
	localStorage.setItem('currentDataUmum', JSON.stringify(dataUmum));
    currentDataUmumSubject.next(dataUmum);
}

function saveDataKeluarga(dataKeluarga) {
	localStorage.setItem('currentDataKeluarga', JSON.stringify(dataKeluarga));
	currentDataKeluargaSubject.next(dataKeluarga); 
}

function saveDataKontakDarurat(kontakDarurat) {
	localStorage.setItem('currentDataKontakDarurat', JSON.stringify(kontakDarurat));
	currentDataKontakDaruratSubject.next(kontakDarurat);
}

function saveDataRiwayatPendidikan(riwayatPendidikan) {
	localStorage.setItem('currentDataRiwayatPendidikan', JSON.stringify(riwayatPendidikan));
	currentDataRiwayatPendidikanSubject.next(riwayatPendidikan);
}

function saveDataLokakarya(lokakarya) {
	localStorage.setItem('currentDataLokakarya', JSON.stringify(lokakarya));
	currentDataLokakaryaSubject.next(lokakarya);
}

function saveDataPengalamanKerja(pengalamanKerja) {
	localStorage.setItem('currentDataPengalamanKerja', JSON.stringify(pengalamanKerja));
	currentDataPengalamanKerjaSubject.next(pengalamanKerja);
}