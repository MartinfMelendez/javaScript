//Se crea el archivo fetch para el uso de una API

//Se crea una variable para guardar la url que se va a utilizar en el fetch
const url = 'https://fakestoreapi.com/products'

const contenedor = document.querySelector('.container-card')
const productos = JSON.parse(sessionStorage.getItem('Productos'))

const arrayProductos = []
fetch(url) //Se utiliza una API que contiene distintos productos para trabajar
    .then((res) => res.json())
    .then((data) => {
        arrayProductos.push(...data)
        sessionStorage.setItem('Productos', JSON.stringify(data));//Se decide trabajar con sessionStorage
        crearCards();
        crearCarrito()
    });


//Se crea una funcion para poder crear las tarjetas con los productos
function crearCards() {

    const productos = JSON.parse(sessionStorage.getItem('Productos'))

    productos.forEach(x => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `<img src='${x.image}'></img>
        <h3 >${x.title}</h3>
        <p>${x.description}</p>
        <p>$${x.price}</p>
        <button class='agregar' value='${x.id}'>Agregar</button>`//El value se utiliza para hacer referencia al id de los productos
        contenedor.appendChild(card)
    })
}

function crearCarrito() {
    const cards = document.querySelectorAll('.card')//Selecciono todas las card
    const table = document.getElementById('productos-lista')//Selecciono la tabla a donde voy a mostrar los productos elegidos
    cards.forEach(x => {
        const boton = x.querySelector('.agregar')
        boton.addEventListener('click', () => {
            const id = x.querySelector('.agregar').getAttribute('value')//Obtengo el id del boton que selecciono

            buscarProducto(id)
            Toastify({
                text: "Articulo agregado",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();

        })
    })
}

const carrito = []
let res = 0;
function buscarProducto(id) {

    const table = document.getElementById('productos-lista')
    const sumary = document.getElementById('total')

    const item = arrayProductos.find(x => x.id == id)

    carrito.push(item)
    const tr = document.createElement('tr')
    const tdImagen = document.createElement('td')
    tdImagen.innerHTML = `<img src='${item.image}'>`
    const tdNombre = document.createElement('td')
    tdNombre.textContent = item.title
    const tdPrecio = document.createElement('td')
    tdPrecio.textContent = `$${(item.price).toFixed(2)}`
    tr.appendChild(tdImagen)
    tr.appendChild(tdNombre)
    tr.appendChild(tdPrecio)
    table.appendChild(tr)

    res += item.price

    sumary.innerText = `$${res.toFixed(2)}`
}

const btnBuscar = document.getElementById('btn-buscar')

btnBuscar.addEventListener('click', () => {
    const buscar = document.querySelector('.buscar').value.trim().toUpperCase()
    const res = arrayProductos.filter(x => x.title.toUpperCase().includes(buscar))

    if (buscar === '') {
        Toastify({
            text: "Complete el campo",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
        return;
    } else if (res.length == 0) {
        Toastify({
            text: "No hay articulos con esa descripcion",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    } else {
        contenedor.innerHTML = ''

        res.forEach(x => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `<img src='${x.image}'></img>
<h3 >${x.title}</h3>
<p>${x.description}</p>
    <p>$${x.price}</p>
<button class='agregar' value='${x.id}'>Agregar</button>`//El value se utiliza para hacer referencia al id de los productos
            contenedor.appendChild(card)
        })
    }
})


