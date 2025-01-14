const preload = () => {
    let productos = JSON.parse(localStorage.getItem('productos'))
    let container = document.querySelector('.container-card')
    //let contenidoHTML =''

    if (productos) {
        productos.forEach(x => {
            let card = document.createElement('div');
            card.classList.add('card')
            card.innerHTML += `<img src="${x.imagen}">
        <p>Nombre: <b>${x.nombre}</b></p>
          <p>Precio: ${x.precio}</p>
          <p>Stock: ${x.stock}</p>
          <button>Comprar</button>`

            container.appendChild(card)
        })
    }
}

// const crearCard = (img, nombre, precio, stock) => {
//     let contenedor = document.querySelector('.container-card')
//     let card = document.createElement('div')
//     card.classList.add('card')
//     card.innerHTML += ` 
//     <img src='${img}'></img> <h4>Nombre: ${nombre}</h4>
//   <p>Precio:$${precio}</p>
//   <p>Stock: ${stock}</p>
//   <button>Comprar</button>`
  
//     contenedor.appendChild(card)
//   }

preload()