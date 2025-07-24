/* //var let const
//var a = 10;
let b = 20;
let c = 30;
let d = b;

miaFun();
console.log (sommaConParametri(10, 10));
const somma = sommaConParametri (30, 30);
console.log(somma);


function miaFun() {
    console.log('Variabile b', b);
    console.log('Variabile c', c);
    b = c;
    c = d;
    console.log('Variabile b', b);
    console.log('Variabile c', c);
};

function sommaConParametri(valore1, valore2) {
    return valore1 + valore2;
} */

let numero = 10;
let stringa = 'Giulia';
let booleano = true;
let indefinito = undefined;
let nullo = null;
let oggetto = {
    nome: 'Mario',
    cognome: 'Rossi'
};
console.log(oggetto.nome);
let collezioni = [10,20,30,40,50,60];

for(let indice = 0; indice<=collezioni.length-1;indice++) {
    //console.log(collezione[indice]);
};

for(const elemento of collezioni) {
    //console.log(elemento)
}

//forEach
//collezioni.forEach((elemento) => console.log(elemento *= 2));

//map
const newCollez = collezioni.map((numero) => {
    if(numero < 50) {
        return numero;
    }
});
//console.log(newCollez);

//filter
/* const newCollez2 = collezioni.filter((numero) => {
    if(numero < 50) {
        return numero;
    }
}); */
/* const newCollez2 = collezioni.filter((numero) => numero < 50);
console.log(newCollez2);
 */
//find
/* const newCollez3 = collezioni.find((numero) => numero < 50);
console.log(newCollez3); */


const arrayDiNumeri = [10,20,30];
console.log(arrayDiNumeri);
arrayDiNumeri.push(40);
console.log(arrayDiNumeri);
arrayDiNumeri.pop();
console.log(arrayDiNumeri);
arrayDiNumeri.unshift(40);
console.log(arrayDiNumeri);
arrayDiNumeri.shift();
console.log(arrayDiNumeri);
arrayDiNumeri.splice(0,1);
console.log(arrayDiNumeri);

const user = {
    nome: 'Mario',
    cognome: 'Rossi'
}
console.log(user);

user.nome = 'Antonio'
console.log(user);