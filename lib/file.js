//async/await + try/catch
//dokumentacija (jsDoc)

import fs from 'fs/promises'; //node.js modulis, kuris jau yra node parasytas, reikia ji susiimportuoti is fs, file system.
import path from 'path';
import { fileURLToPath } from 'url';
//console.log(fs)

const file = {};

/**
 * Sugeneruojamas absoliutus kelias iki nurodyto failo.
 * @param {string} dir Reliatyvus kelias iki direktorijos, kur laikomi norimi failai, pvz.: /data/users, data nerasoma dalis, reikia nurodyti tik users.
 * @param {string} fileName Norimo failo pavadinimas su jo pletiniu.
 * @returns {string} Absoliutus kelias iki failo.
 */
file.fullPath = (dir, fileName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '../data', dir, fileName);
}

/**
 * Sukuriamas failas, jeigu tokio dar nera nurodytoje direktorijoje.
 * @param {string} dir Reliatyvus kelias iki direktorijos, kur laikomi norimi failai, pvz.: /data/users, data nerasoma dalis, reikia nurodyti tik users.
 * @param {string} fileName Norimo failo pavadinimas su jo pletiniu.
 * @param {object} content Objektas, kuri norima irasyti i kuriama faila.
 * @returns {boolean|string} Sekmes atveju - `true`; klaidos atveju - klaidos pranesimas, stringinis formatas.
 */
 file.create = async (dir, fileName, content) => {
    let fileDescriptor = null;  //kazkada bus reiksme, bet dabar dar nera.
    try {
        const filePath = file.fullPath(dir, fileName);
        fileDescriptor = await fs.open(filePath, 'wx');
        await fs.writeFile(fileDescriptor, JSON.stringify(content));
        return true;
    } catch (error) {
        return false;
    } finally {
        if (fileDescriptor) {
            fileDescriptor.close();
        }
    }
}


/**
 * Perskaitomas failo turinys (tekstinis failas).
 * @param {string} dir Reliatyvus kelias iki direktorijos, kur laikomi norimi failai, pvz.: /data/users, data nerasoma dalis, reikia nurodyti tik users.
 * @param {string} fileName Norimo failo pavadinimas su jo pletiniu.
 * @returns {promise<string|boolean>} Sekmes atveju - failo turinys; Klaidos atveju 'UPS...';
 */
file.read = async (dir, fileName) => {
    try {
        const filePath = file.fullPath(dir, fileName); //padaro absoliutu kelia;
        console.log(filePath);
        const fileContent = await fs.readFile(filePath, 'utf-8');//utf-8 Buferio dekodinimo pasirinktas budas, terminale matome jau nebe skaicius, bet teksta.
        return fileContent;
    } catch (error) {         //kad nesugadintu programos, vykdo catch nurodyta atsakyma, ups..(nepavykus perskaityti failo.)
        console.log(error)    //atsispausdina eroras. Klaida pagaunama, nesustabdzius programos/serverio.
        return 'UPS...';
    }
}

/**
 * JSON failo turinio atnaujinimas .data folder'yje.
 * @param {string} dir Sub-folder'is esantis .data folder'yje.
 * @param {string} fileName Kuriamo failo pavadinimas be failo pletinio.
 * @param {Object} content JavaScript objektas, pvz.: `{name: "Marsietis"}`.
 * @returns {boolean} Pozymis, ar funkcija sekmingai atnaujintas nurodyta faila.
 */
 file.update = async (dir, fileName, content) => {
    let fileDescriptor = null;
    try {
        const filePath = file.fullPath(dir, fileName);
        fileDescriptor = await fs.open(filePath, 'r+');
        await fileDescriptor.truncate();
        await fs.writeFile(fileDescriptor, JSON.stringify(content));
        return true;
    } catch (error) {
        return false;
    } finally {
        if (fileDescriptor) {
            await fileDescriptor.close();
        }
    }
}

/**
 * JSON failo istrinimas .data folder'yje.
 * @param {string} dir Sub-folder'is esantis .data folder'yje.
 * @param {string} fileName Kuriamo failo pavadinimas be failo pletinio.
 * @returns {boolean} Pozymis, ar funkcija sekmingai istrintas nurodyta faila.
 */
 file.delete = async (dir, fileName) => {
    try {
        const filePath = file.fullPath(dir, fileName);
        await fs.unlink(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

export { file };