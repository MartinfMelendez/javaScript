//Funcion para cargar todos los productos del localStorage cuando se inicializa la pagina
const preload = () => {
    let productos = JSON.parse(localStorage.getItem('productos'))

    if (productos) {
        productos.forEach(x => {
            crearCards(x.imagen, x.nombre, x.precio, x.stock)
        })
    }
}

//Funcion para crear las cards
const crearCards = (img, nombre, precio, stock) => {
    let contenedor = document.querySelector('.container-card')
    let card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML += `<img class='pImagen' value='${img}' src="${img}">
    <p class='pProductos' value='${nombre}'>Nombre: <b>${nombre}</b></p>
      <p class='pPrecio' value='${precio}'>Precio: $${precio}</p>
      <p>Stock: ${stock}</p>
       <button class='comprar'>Comprar</button>` //Se le agrega una class al boton 

    contenedor.appendChild(card)
}
preload()

const cards = document.querySelectorAll('.card')//Selecciono todas las card
const table = document.getElementById('productos-lista')
cards.forEach(x => {//Recorro todas las card para saber cual ejecuta el evento click.
    const boton = x.querySelector('.comprar')
    boton.addEventListener('click', () => {
        const imagen = x.querySelector('.pImagen').getAttribute('src')
        const producto = x.querySelector('.pProductos').getAttribute('value')
        const precio = x.querySelector('.pPrecio').getAttribute('value')

        const tr = document.createElement('tr') //Se crea una fila por cada producto
        const tdImagen = document.createElement('td')
        tdImagen.innerHTML = `<img src='${imagen}'>`
        const tdNombre = document.createElement('td')
        tdNombre.textContent= producto
        const tdPrecio = document.createElement('td')
        tdPrecio.textContent =`$${precio}`
        tr.appendChild(tdImagen)
        tr.appendChild(tdNombre)
        tr.appendChild(tdPrecio)
        table.appendChild(tr) 
        
    })
})




