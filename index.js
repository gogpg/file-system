import { file } from './lib/file.js';

const userMaryte = {
    name: 'Maryte',
    age: 87,
    isMarried: false,
}

const createStatus = await file.create('users', 'maryte.json', userMaryte); //metodas sukurti faila, nueina i users folderi, tame folderyje turi sukurti atitinkamo pavadinimo faila pvz petras.json, ir kaip turini irasyti users objekta.
console.log('Sukuria:', createStatus);

const readStatus = await file.read('users', 'maryte.json');
console.log('Skaito:', readStatus);

userMaryte.isMarried = true;
const updateStatus = await file.update('users', 'maryte.json', userMaryte);
console.log('Atnaujina:', updateStatus);

const deleteStatus = await file.delete('users', 'maryte.json');
console.log('Istrina:', deleteStatus);

const readStatus2 = await file.read('users', 'maryte.json');
console.log('Skaito:', readStatus);


