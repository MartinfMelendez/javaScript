//Se crea el archivo fetch para el uso de una API

//Se crea una variable para guardar la url que se va a utilizar en el fetch
let carrito = JSON.parse(sessionStorage.getItem("Carrito")) || [];

const url = "https://fakestoreapi.com/products";

const contenedor = document.querySelector(".container-card");
const productos = JSON.parse(sessionStorage.getItem("Productos"));

const arrayProductos = [];//Este array se crea para almacenar los datos del fetch
fetch(url) //Se utiliza una API que contiene distintos productos para trabajar
  .then((res) => res.json())
  .then((data) => {
    arrayProductos.push(...data);
    sessionStorage.setItem("Productos", JSON.stringify(data)); //Se decide trabajar con sessionStorage
    crearCards(arrayProductos);
    crearCarrito();//Me aseguro que se creen despues de obtener los datos de la URL
    crearTabla();
  })

//Se crea una funcion para poder crear las tarjetas con los productos
function crearCards(productos) {
  contenedor.innerHTML = "";
  productos.forEach((x) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src='${x.image}'></img>
        <h3 >${x.title}</h3>
        <p>${x.description}</p>
        <p>Cantidad:</p>
             <div class="cantidad-container">
        <button class="menos">-</button>
        <input type="number" readonly class='cantidad' value='1'></input>
        <button class="mas">+</button>
      </div>
        <p>$${x.price}</p>
        <button class='agregar' value='${x.id}'>Agregar</button>`; //El value se utiliza para hacer referencia al id de los productos
    contenedor.appendChild(card);
  });
  agregarEvento();
}

function crearCarrito() {
  const cards = document.querySelectorAll(".card"); //Selecciono todas las card
  cards.forEach((x) => {
    const boton = x.querySelector(".agregar");
    boton.addEventListener("click", () => {
      const cantidadInput = x.querySelector(".cantidad");
      const cantidad = parseInt(cantidadInput.value);
      const id = boton.getAttribute("value"); //Obtengo el id del boton que selecciono
      buscarProducto(id, cantidad);
      Toastify({
        text: "Articulo agregado",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    });
  });
}

//Funcion para buscar un producto
function buscarProducto(id, cantidad) {//Se le pasa la cantidad para agregarlo al array
  const item = arrayProductos.find((x) => x.id == id);

  if (item) {
    const productoCarrito = carrito.find((x) => x.id == id);

    if (productoCarrito) {
      productoCarrito.cantidad += cantidad;
    } else {
      item.cantidad = cantidad;
      carrito.push(item);
    }
  }

  sessionStorage.setItem("Carrito", JSON.stringify(carrito)); //Se guarda en sessionStorage el carrito

  crearTabla();
}

function crearTabla() { //Separo la creacion de las tablas que simulan el carrito
  const table = document.getElementById("productos-lista");
  const sumary = document.getElementById("total");

  table.innerHTML = "";

  let res = 0;
  carrito.forEach((x, index) => {
    const tr = document.createElement("tr");
    const tdImagen = document.createElement("td");
    tdImagen.innerHTML = `<img src='${x.image}'>`;
    const tdNombre = document.createElement("td");
    tdNombre.textContent = x.title;
    const tdCantidad = document.createElement("td");
    tdCantidad.textContent = x.cantidad;
    const tdPrecio = document.createElement("td");
    tdPrecio.textContent = `$${x.price.toFixed(2)}`;
    const tdPrecioTotal = document.createElement("td");
    tdPrecioTotal.textContent = `$${x.price.toFixed(2) * x.cantidad}`;
    const tdBoton = document.createElement("td");
    tdBoton.innerHTML = `<button class='eliminar'>-</button>`;
    tr.appendChild(tdImagen);
    tr.appendChild(tdNombre);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdPrecioTotal);
    tr.appendChild(tdBoton)
    table.appendChild(tr);

    res += x.price.toFixed(2) * x.cantidad;
    //Cada vez que crea el boton se le asigna el evento.
    const botonEliminar = tr.querySelector(".eliminar");
    botonEliminar.addEventListener("click", () => {
      eliminarProducto(index); // El índice se pasa para eliminar el artículo del carrito.
    });
  });

  sumary.innerText = `$${res.toFixed(2)}`;
}

//Funcion para eliminar un producto del carrito 
function eliminarProducto(index) {
  carrito.splice(index, 1);
  sessionStorage.setItem("Carrito", JSON.stringify(carrito));
  crearTabla();
}

const btnBuscar = document.getElementById("btn-buscar");
const inputBuscar = document.querySelector(".buscar");
//Boton con la logica para buscar los productos que coincidan con lo que escriba el usuario
btnBuscar.addEventListener("click", () => {
  const buscar = document.querySelector(".buscar").value.trim().toUpperCase();
  const filtrado = arrayProductos.filter((x) =>
    x.title.toUpperCase().includes(buscar)
  );
  if (buscar === "") {
    Toastify({
      text: "Complete el campo",
      duration: 2000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    return;
  } else if (filtrado.length == 0) {
    Toastify({
      text: "No hay articulos con esa descripcion",
      duration: 1000,
      style: {
        background: "linear-gradient(to right, #96c93d, #00b09b)",
      },
    }).showToast();
  } else {
    crearCards(filtrado);
    crearCarrito();
  }
});

//Se utiliza para que cuando se borre la busqueda por el input se muestren todas las tarjetas
inputBuscar.addEventListener("input", function () {
  const buscar = inputBuscar.value.trim().toUpperCase();
  if (buscar === "") {
    crearCards(arrayProductos);
    crearCarrito();
  }
}
);



//Se crear una funcion para poder filtrar los productos en base a la categoria

const select = document.querySelector("#descripcion");
select.addEventListener("change", function () {
  let valor = this.value.toUpperCase();

  const filtro = arrayProductos.filter(
    (x) => x.category.toUpperCase() == valor
  );
  if (filtro < 1) {
    crearCards(arrayProductos)
    crearCarrito();
  } else {
    crearCards(filtro);
    crearCarrito();
  }


});

//Funcion para agregar los evento a los botones que controlan la catidad de articulos
function agregarEvento() {
  const contenedorCantidad = document.querySelectorAll(".cantidad-container");
  contenedorCantidad.forEach((x) => {
    const num = x.querySelector(".cantidad");
    let resultado = parseInt(num.value);
    const btnMenos = x.querySelector(".menos");
    const btnMas = x.querySelector(".mas");

    btnMenos.addEventListener("click", () => {
      if (resultado > 1) {
        resultado--;
        num.value = resultado;
      }
    });

    btnMas.addEventListener("click", () => {
      resultado++;
      num.value = resultado;
    });
  });
}


//Funcion para utilizar los filtros de precio.
const btnFiltrar = document.getElementById('btn-filtrar')
btnFiltrar.addEventListener('click', () => {

  //Busco el mayor precio dentro de las listas

  const mayor = arrayProductos.reduce((max, monto) => {
    return monto.price > max.price ? monto : max
  }, arrayProductos[0])


  const minPrecio = document.getElementById('precio-min').value || 0 //Coloco por defecto el precio minimo
  const maxPrecio = document.getElementById('precio-max').value || mayor.price //Coloco por defecto el mayor precio que se encuentra disponible


  if (parseFloat(maxPrecio) < parseFloat(minPrecio)) {//Se agrega un condicional para que el usuario no puedo poner un precio minimo mayo al precio maximo
    return Toastify({
      text: "El precio minimo no puede mas grande que el precio maximo. Verifique",
      duration: 2000,
      position: "left",
      style: {
        background: "linear-gradient(to right,rgb(149, 86, 91),rgb(176, 0, 35))",
      },
    }).showToast();
  }
  if (minPrecio < 0 || maxPrecio < 0) {
    Toastify({
      text: "El precio debe ser mayor de 0",
      duration: 2000,
      style: {
        background: "linear-gradient(to right,rgb(149, 86, 91),rgb(176, 0, 35))",
      },
    }).showToast();
  } else {
    const resultado = arrayProductos.filter(x => x.price >= minPrecio && x.price <= maxPrecio)
    crearCards(resultado)
    crearCarrito()
    agregarEvento()
  }
  recargarFiltros()
})


function recargarFiltros() {
  const minPrecio = document.getElementById('precio-min')

  minPrecio.addEventListener('input', function () {
    const buscar = minPrecio.value;
    if (buscar === "") {
      crearCards(arrayProductos);
      crearCarrito();
    }
  })

  const maxPrecio = document.getElementById('precio-max')
  maxPrecio.addEventListener('input', function () {
    const buscar = maxPrecio.value;
    if (buscar === "") {
      crearCards(arrayProductos);
      crearCarrito();
    }
  })
}



const finishBuy = document.getElementById('finish')
//Funcion para verificar si el carrito esta vacio
finishBuy.addEventListener('click', () => {
  const carrito = sessionStorage.getItem('Carrito')
  if (carrito) {
    mostrarFormulario()
  } else {
    Swal.fire({
      title: "Opss",
      text: "El carrito esta vacio!",
      icon: "error"
    });
  }

})
//Funcion para mostrar formulario de la compra
function mostrarFormulario() {
  Swal.fire({
    title: 'Finaliza tu Compra',
    html: `
          <form id="form-compra">
              <div class="input-group">
                  <label class='SW2-label' for="nombre">Nombre Completo</label>
                  <input class='SW2-select' type="text" id="nombre" name="nombre" required>
              </div>
              <div class="input-group">
                  <label class='SW2-label' for="direccion">Dirección</label>
                  <input class='SW2-select' type="text" id="direccion" name="direccion" required>
              </div>
              <div class="input-group">
                  <label class='SW2-label' for="telefono">Teléfono</label>
                  <input class='SW2-select' type="tel" id="telefono" name="telefono" required>
              </div>
              <div class="input-group">
                  <label class='SW2-label' for="email">Correo Electrónico</label>
                  <input class='SW2-select' type="email" id="email" name="email" required>
              </div>
          </form>
      `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Finalizar Compra',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      // Aquí puedes obtener los datos del formulario y hacer algo con ellos
      const nombre = document.getElementById('nombre').value;
      const direccion = document.getElementById('direccion').value;
      const telefono = document.getElementById('telefono').value;
      const email = document.getElementById('email').value;

      if (!nombre || !direccion || !telefono || !email) {
        Swal.showValidationMessage('Por favor, completa todos los campos');
      } else {
        // Aquí puedes procesar la compra, por ejemplo, enviando los datos al servidor
        Swal.fire('Compra Finalizada', 'Gracias por tu compra ' + nombre + '. La misma sera enviada a la siguiente direccion ' + direccion, 'success');
        const table = document.getElementById("productos-lista");
        const sumary = document.getElementById("total")
        sumary.innerText = ''
        table.innerHTML = ''
        sessionStorage.removeItem('Carrito')
      }
    }
  })
}

