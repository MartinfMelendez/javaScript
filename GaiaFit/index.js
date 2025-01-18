
//Funcion para cargar todos los productos del localStorage cuando se inicializa la pagina
const preload = () => {
    let productos = JSON.parse(localStorage.getItem('productos'))

    if (productos) {
        productos.forEach(x => {
            crearCard(x.imagen, x.nombre, x.precio, x.stock)
        })
    }
}

const crearCard = (img, nombre, precio, stock) => {
    let contenedor = document.querySelector('.container-card')
    let card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML += `<img src="${img}">
    <p>Nombre: <b>${nombre}</b></p>
      <p>Precio: ${precio}</p>
      <p>Stock: ${stock}</p>
      <button value='agregar'>Comprar</button>`

    contenedor.appendChild(card)
}
preload()