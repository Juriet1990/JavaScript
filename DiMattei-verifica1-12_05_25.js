// Esercizio 6
// 6. Domande su javascript:
// Che differenza c'è tra le funzioni array.forEach() e array.map()?

// Risposta: 
// forEach si usa per i cicli, e serve per eseguire una funzione per ogni singolo elemento dell'array. 
// Esempio: 
array.forEach(el => {
    console.log(el);
});
// Map invece crea un nuovo array, e trasforma ogni elemento del primo array in una funzione. Senza modificare l'originale.
// Esempio:
let nome = ["Kobo"];
let upperCase = nome.map(name => name.toUpperCase());
console.log(upperCase);
// Dovrebbe stampare l'array di: ["KOBO"] in maiuscolo e in stampatello, non modificando l'array originale. 
// Quindi trasforma l'originale da minuscolo a maiuscolo, mantenendoli entrambi.

// Se devo valorizzare un nuovo array sulla base di un array preesistente quale delle due precedenti funzioni mi conviene utilizzare? Perchè?

// Risposta:
// Credo convenga utilizzare array.map(), perché così la base di quello originale pre-esistente non viene toccata, ma solo modificata con un nuovo array.
// Esempio:
let numeri = [1, 4, 6];
let moltiplicazione = numeri.map(numero => numero * 2);
console.log(moltiplicazione);
// Dovrebbe stampare la moltiplicazione array: [2, 8, 12], senza modificare l'originale, ma trasformando quello pre-esistente. 

//

// Esercizio 1
// 1. Cosiderando come contesto lo pseudocodice tipizzato, indicare se i seguenti statement sono corretti oppure errati.

// int j=10;			Corretto? Y/N		Perchè? 
// int i='10';			Corretto? Y/N		Perchè? 
// string s=1;			Corretto? Y/N		Perchè? 
// string a=j+'10';	Corretto? Y/N		Perchè? 

// string function miafun (string par1){			Corretto? Y/N	 	Perchè? 
//	return par1;
// }

// int b=miafun('1');	Corretto? Y/N		Perchè? 
// string c=miafun(1);	Corretto? Y/N		Perchè? 
// string d=miafun('1');	Corretto? Y/N	Perchè?

// Risposta:
// int j=10; Sì, perché assegno un valore intero.
// int i='10'; Sì, perché assegno un valore numerico stringa.
// string s=1; No, perché non ci sono le virgolette('') delle stringhe.
// string a=j+'10'; No, perché non posso sommare int e stringa.

// string function miafun(string par1) {
// return par1;
// }
// Sì, perché è una funzione stringa che definisce un parametro e lo restituisce uguale.

// int b=miafun('1'); No, perché i tipi non sono compatibili: int e stringa.
// string c=miafun(1); No, perché (1) non ha le virgolette della stringa. string c=miafun('1'); dovrebbe essere la risposta corretta.
// string d=miafun('1'); Sì, perché ha un valore stringa.

//

// Esercizio 2
// 2. Dato il seguente codice javascript, cosa restituisce?

function miafun(par1, par2){
	let ret=0;
    par1 = par1 + par2;
    ret= par1 + par2;
    return ret;
}

// let var1 = 1;
// let var2 = miafun(var1, 2);
// console.log('var1', var1);			// => cosa scrive?	Perchè?
// console.log('par2', par2);			// => cosa scrive?  Perchè?	

// Risposta:
function miafun(par1, par2){
	let ret=0;
    par1 = par1 + par2;
    ret= par1 + par2;
    return ret;
}
// Restituisce la somma di par1 + par2.

// Nella console del browser stampa var1, al contrario, par2 è undefined.
// Perché: var1 è stato definito con let var1 = 1; mentre par2 no.

// 

// Esercizio 3
// 3. Scrivere una funzione javascript che accetti in input un array di interi e un numero elementi_da_utilizzare e restituisca in output la somma di tutti gli elementi il cui indice nell'array è minore o uguale al numero elementi_da_utilizzare passato in input.
// Esempio:
// INPUT: arrInput=[1,2,6,3,5]  elementi_da_utilizzare=3
// OUTPUT: ret=12

// Risposta:
// Uso un ciclo per sommare
function sommaArr(arrInput, elementi_da_utilizzare) {
    let sommaArr = [1, 2, 6, 3, 5];
    let elementi_da_utilizzare = 3;
    let ret = sommaArr(arrInput, elementi_da_utilizzare);
    for (let i = 0; i < elementi_da_utilizzare; i++) {
        return somma;
        }  
    };

console.log(somma) // Dovrebbe stampare la somma

// 

// Esercizio 4
// 4. Scrivere una funzione javascript che accetti in input un array di json definito in jsonInput e una stringa contenente una categoria, e restituisca in output un intero che contenga il numero di volte in cui la categoria è presente nel jsonInput
// INPUT: jsonInput=[
//    {id: 1, category: "cat1", name: "file1.pdf", extension: "pdf", size: 100 },
//    {id: 2, category: "cat2", extension: "xls", size: 200 },
//    {id: 3, category: "cat2", name: "file5.docx", extension: "docx", size: 150 },
//    {id: 4, category: "cat1", extension: "pdf", size: 200 },
//    {id: 5, category: "cat4", name: "file9.pdf", extension: "pdf", size: 300 }
//    ]
//    categoria:"cat1"
//    OUTPUT: int ret=2;

// Risposta:





// Esercizio 5
// 5. date le seguenti definizioni di array in javascript:
// let array1=[4,8,2,5,3,9,1];
// let array2=[3,1,4,6,5,2,1];
// const array3=[3,1,4,6,5,2,1];
// var array4=[3,1,4,6,5,2,1];
// let arrayglobale=[array1,array2,array3,array4];
// scrivere il risultato di quanto richiesto (oppure specificare l'errore)
// di che tipo è la variabile array1 ?					//=> 
// di che tipo è la variabile arrayglobale ?			//=> 
// di che tipo è il contenuto di arrayglobale[1] ? 	//=> 
// quanto vale array1[1] ?								//=> 
// quanto vale array[1] ?								//=> 
// quanto vale array[1][4] ?							//=> 
// quanto vale array[1][4][5] ?						//=> 
// quanto vale arrayglobale[1] ?						//=> 
// quanto vale arrayglobale[1][4] ?					//=> 
// quanto vale arrayglobale[1][4][5] ?					//=> 

// Risposta:
// La variabile 1 è di tipo: array intero.
// La variabile arrayglobale è di tipo: array di array.
// Il contenuto di arrayglobale[1] è di tipo: array.
// array1[1] vale 4.
// array[1] vale 0.
// array[1][4] valgono 0 e 3.
// array[1][4][5] valgono 0, 3, 4.
// arrayglobale[1] vale array1.
// arrayglobale[1][4] valgono array1 e array3.
// arrayglobale[1][4][5] valgono array1, array3 e array4.