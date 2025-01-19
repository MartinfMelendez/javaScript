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
    card.innerHTML += `<img value='${img}' src="${img}">
    <p value='${nombre}'>Nombre: <b>${nombre}</b></p>
      <p value='${precio}'>Precio: ${precio}</p>
      <p>Stock: ${stock}</p>
       <button>Comprar</button>` //Se le agrega una class al boton 

    contenedor.appendChild(card)
}
preload()




