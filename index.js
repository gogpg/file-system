import { file } from './lib/file.js';

const readStatus = await file.read('users', 'petras.json');
//console.log(readStatus);

const userMaryte = {
    name: 'Maryte',
    age: 87,
    isMarried: false,
}

const createStatus = await file.create('users', 'maryte.json', userMaryte); //metodas sukurti faila, nueina i users folderi, tame folderyje turi sukurti atitinkamo pavadinimo faila pvz petras.json, ir kaip turini irasyti users objekta.
console.log('File status:', createStatus);

const userAntanas = {
    name: 'Antanas',
    age: 100,
    isMarried: true,
}

const createStatus2 = await file.create('users', 'antanas.json', userAntanas); //metodas sukurti faila, nueina i users folderi, tame folderyje turi sukurti atitinkamo pavadinimo faila pvz petras.json, ir kaip turini irasyti users objekta.
console.log('File status:', createStatus2);
