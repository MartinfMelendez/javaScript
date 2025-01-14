//Se crea una clase Productos
let arrayProducto = JSON.parse(localStorage.getItem("productos")) || []; //Verifica si hay datos en localStorage en caso de estar vacio, crea el array
class Productos {
  //Se crea un constructor para la clase
  constructor(id, imagen, nombre, precio, stock) {
    (this.id = id), (this.imagen = imagen);
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
  //Se crea un metodo el cual se encarga de validar los datos ingresados
  validarDatos(imagen, nombre, precio, stock) {
    if (imagen === "" || nombre === "" || isNaN(precio) || isNaN(stock)) {
      alert("Se debe de completar todos los campos");
      return false;
    } else {
      return true;
    }
  }

  //Se crea un metodo el cual se encarga de crear un nuevo producto
  crearProducto() {
    let imagen = document.getElementById("imagen").value;
    let nombre = document.getElementById("nombre").value.toUpperCase().trim();
    let precio = document.getElementById("precio").value.trim();
    let stock = document.getElementById("stock").value.trim();

    let id =
      arrayProducto.length > 0
        ? arrayProducto[arrayProducto.length - 1].id + 1
        : 1; //Id autoincremental 1 en 1
    if (!this.validarDatos(imagen, nombre, precio, stock)) {
      return;
    }

    let rutaImg = `./img/${imagen}`; //Se concatena la ruta en la cual esta la imagen

    let producto = new Productos(id, rutaImg, nombre, precio, stock);

    let existe = arrayProducto.some((x) => x.nombre === nombre);

    if (existe) {
      alert("El producto que intenta ingresar ya existe");
      return;
    }

    arrayProducto.push(producto);
    let guardar = JSON.stringify(arrayProducto);
    localStorage.setItem("productos", guardar);
  }

  //Se crea un metodo para buscar un producto
  buscarProducto() {
    const producto = document.getElementById("buscar");

    let productosJSON = JSON.parse(localStorage.getItem("productos"));
    if (!productosJSON || productosJSON.length === 0) {
      alert("No hay productos disponibles.");
      return;
    }

    if (producto.value === "") {
      alert("Se debe de completar el campo para buscar un producto");
    } else {
      const buscar = productosJSON.find(
        (x) => x.nombre.toUpperCase() === producto.value.toUpperCase()
      );
      if (!buscar) {
        alert("El producto ingresado no existe");
      } else {
        let contenedor = document.querySelector(".container-card");
        contenedor.innerHTML = "";

        let div = document.createElement("div"); // Creamos el div para la card
        div.classList.add("card"); // Añadimos la clase 'card'

        // Rellenamos el contenido de la card con la información del producto
        div.innerHTML = `
    <img src="${buscar.imagen}" alt="${buscar.nombre}">
    <h4>Nombre: ${buscar.nombre}</h4>
    <p>Precio: $${buscar.precio}</p>
    <p>Stock: ${buscar.stock}</p>
    <button>Comprar</button>
  `;
        contenedor.appendChild(div);
      }
    }
  }
  //Se crea una funcion para que el producto al precionar una letra le muestre productos con esas letras
  buscarInput() {
    const productos = document.getElementById("buscar");
    let container = document.querySelector(".container-card");
    container.innerHTML = "";
    const buscar = arrayProducto.filter((producto) =>
      producto.nombre.includes(productos.value.trim().toUpperCase())
    );
    if (buscar.length === 0) {
      console.log("producto no existe");
    } else {
      buscar.forEach((producto) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML += `<img src="${producto.imagen}">
        <p>Nombre: <b>${producto.nombre}</b></p>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: ${producto.stock}</p>
      <button>Comprar</button>`;
        container.appendChild(card);
      });
    }
  }
  //Se crea un metodo para eliminar un usuario
  eliminarProducto() {
    //Se crea una variaable para buscar el indice del producto que queremos eliminar
    let nombre = document.getElementById("eliminar").value.toUpperCase().trim();
    let producto = JSON.parse(localStorage.getItem("productos"));
    const eliminar = producto.findIndex((x) => x.nombre === nombre);
    let contenedor = document.querySelector(".container-card");
    if (eliminar === -1) {
      alert("El producto que intenta eliminar no existe");

      contenedor.innerHTML = "";
    } else {
      localStorage.clear();
      producto.splice(eliminar, 1);
      let guardar = JSON.stringify(producto);
      localStorage.setItem("productos", guardar);
      alert("Producto eliminado correctamente");
      contenedor.innerHTML = "";
    }
  }
  //Se crea un metodo para buscar un usuario
  // modificarUsuario(us, email, contraseña) {
  //   //Se pasan 3 parametros, el primero es el usuario que busco, el segundo y tercero es para poder modificar el usuario buscado

  //   if (!this.validarDatos(email, contraseña)) {
  //     //llamo a la funcion validar datos para evitar que el usuario no ingrese datos
  //     return;
  //   }
  //   //Busco el indice del usuario que se esta buscando
  //   const indice = usuario.findIndex((x) => x.email === us);
  //   if (indice === -1) {
  //     console.log("El usuario que intenta modificar no existe");
  //   } else {
  //     //Utilizo splice para reemplazar en base al indice buscado y creo un nuevo elemento
  //     usuario.splice(indice, 1, new Usuarios(email, contraseña));
  //     console.log("Se modifico correctamente al usuario ");
  //     console.table(usuario);
  //   }
  // }
}

producto = new Productos();

if (document.getElementById("agregar")) {
  const agregar = document.getElementById("agregar");
  agregar.addEventListener("click", () => {
    producto.crearProducto();
  }); //Se llama a una funcion para poder utilizar el this dentro del crearProducto
}


const btnBuscar = document.getElementById("btn-buscar");
btnBuscar.addEventListener("click", () => {
  producto.buscarProducto();
});

if (document.getElementById("btn-eliminar")) {
  const eliminar = document.getElementById("btn-eliminar");
  eliminar.addEventListener("click", () => {
    producto.eliminarProducto();
  });
}

if(!document.querySelector('.ABM')){
  const input = document.getElementById('buscar')
input.addEventListener('input', producto.buscarInput)
}

