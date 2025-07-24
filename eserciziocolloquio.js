// input: ARR = [3, 0, 5, 11, 7, 4] KEY = 7
// output: RES = [{a: 3, b: 4}, {a: 0, b: 7}] -> le coppie di numeri la cui somma è = alla key

/* function sommaArr(mioArr, key) {
let sommaArr = [3, 0, 5, 11, 7, 4];
let key = 7;
let ret = (mioArr, key);

for(let i = 0; i < mioArr.length; i++) {
    return sommaArr;
    }

}; */

//

const mioArr = [3, 0, 5, 11, 7, 4]; // const perché così non viene cambiato
const key = 7;

function sommaArr(mioArr, key) {
let res = []; // dichiarazione di un array vuoto
  for(let i = 0; i < mioArr.length; i++) { // la prima volta parte da 0 e e la seconda da 1
    for(let j = i + 1; j < mioArr.length; j++) { // si usa j per convenzione, ma posso usare anche a b c d e 1 2 3 4 ecc...
      if(mioArr[i] + mioArr[j] === key) { // === vuol dire confronto: confronta se due valori sono uguali
        res.push({a: mioArr[i], b: mioArr[j]}); // push aggiunge un nuovo elemento alla fine dell'array. in questo caso aggiunge la coppia
      }
    } 
  } return res; // così mette il risultato dentro l'array vuoto dichiarato prima (credo...?)
}

const risultato = sommaArr(mioArr, key); // chiamo la funzione e le variabili

console.log(JSON.stringify(risultato)); // trasforma in stringa il risultato quando stampa

// oppure...

let res = {} // lascio un json vuoto invece di un array, così non devo fare push (?)
