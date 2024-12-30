const div = document.getElementById('app');
const parrafo = document.getElementById('parrafo1')

console.log(div.innerHTML)
console.log(parrafo.innerHTML);

let paises = document.getElementsByClassName('paises')

for(const pais of paises){
    console.log(pais.innerHTML + 'Aca pone algo culiaaa')
}