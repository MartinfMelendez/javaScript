//Se crea una clase Productos
const arrayProducto = []
class Productos {
  //Se crea un constructor para la clase
  constructor(id, imagen, nombre, precio, stock) {
    this.id = id,
      this.imagen = imagen
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
  //Se crea un metodo el cual se encarga de validar los datos ingresados
  validarDatos(id, imagen, nombre, precio, stock) {
    if (isNaN(id) || imagen === '' || nombre === "" || isNaN(precio) || isNaN(stock)) {
      console.log("Se debe de completar todos los campos");
      return false;
    } else {
      return true;
    }
  }

  //Se crea un metodo el cual se encarga de crear un nuevo usuario
  crearProducto(id, imagen, nombre, precio, stock) {
    if (this.validarDatos(id, imagen, nombre, precio, stock)) {
      arrayProducto.push(new Productos(id, imagen, nombre, precio, stock));
      let guardar = JSON.stringify(arrayProducto)
      localStorage.setItem('productos', guardar)
    }

    console.table(arrayProducto);
  }
  //Se crea un metodo para buscar un usuario
  buscarProducto() {
    const producto = document.getElementById('buscar')
    let container = document.querySelector('.card-container')
    container.innerHTML = ''
    const card = document.querySelector('.card')

    const buscar = arrayProducto.find((x) => x.nombre === producto.value);
    if (!buscar) {
      console.log("El producto ingresado no existe");
    } else {
      console.log(`Datos del producto Nombre: ${buscar.nombre}, Precio: $${buscar.precio}, Stock: ${buscar.stock}`);
      card.innerHTML = `<p>Nombre: ${buscar.nombre}</p>
      <p>Precio: ${buscar.precio}</p>
      <p>Stock: ${buscar.stock}</p>
      <button>Comprar</button>`
    }
  }
  //Se crea una funcion para que el usuario al precionar una letra le muestre productos con esas letras
  buscarInput() {
    const productos = document.getElementById('buscar')
    let container = document.querySelector('.card-container')
    container.innerHTML = ''
    const buscar = arrayProducto.filter(producto =>
      producto.nombre.includes(productos.value)
    );
    if (buscar.length === 0) {
      console.log('producto no existe')
    } else {

      buscar.forEach(producto => {
        let card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML += `<p>Nombre: ${producto.nombre}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: ${producto.stock}</p>
      <button>Comprar</button>`
      container.appendChild(card)
      })
      
    }
  }
  //Se crea un metodo para eliminar un usuario
  eliminarUsuario(email) {
    //Se crea una variaable para buscar el indice del usuario que queremos eliminar
    const eliminar = usuario.find((x) => x.email === email);
    if (eliminar === -1) {
      console.log("El usuario que intenta eliminar no existe");
    } else {
      usuario.splice(eliminar, 1);
      console.table(usuario);
    }
  }
  //Se crea un metodo para buscar un usuario
  modificarUsuario(us, email, contraseña) {
    //Se pasan 3 parametros, el primero es el usuario que busco, el segundo y tercero es para poder modificar el usuario buscado

    if (!this.validarDatos(email, contraseña)) {
      //llamo a la funcion validar datos para evitar que el usuario no ingrese datos
      return;
    }
    //Busco el indice del usuario que se esta buscando
    const indice = usuario.findIndex((x) => x.email === us);
    if (indice === -1) {
      console.log("El usuario que intenta modificar no existe");
    } else {
      //Utilizo splice para reemplazar en base al indice buscado y creo un nuevo elemento
      usuario.splice(indice, 1, new Usuarios(email, contraseña));
      console.log("Se modifico correctamente al usuario ");
      console.table(usuario);
    }
  }
}

//Funcion para cargar todos los productos del localStorage cuando se inicializa la pagina
document.addEventListener('DOMContentLoaded', () => {
  let productos = JSON.parse(localStorage.getItem('productos'))
  let container = document.querySelector('.card-container')
  //let contenidoHTML =''
  productos.forEach(x => {
    let card = document.createElement('div');
    card.classList.add('card')
    card.innerHTML += `<p>Nombre: ${x.nombre}</p>
      <p>Precio: ${x.precio}</p>
      <p>Stock: ${x.stock}</p>
      <button>Comprar</button>`

    container.appendChild(card)
  })
  //div.innerHTML = contenidoHTML
})

producto = new Productos();
producto.crearProducto(1, "calza.jpg", 'calza', 32600, 12);
producto.crearProducto(2, "top.jpg", 'top', 30000, 5);
producto.crearProducto(3, "conjunto.jpg", 'conjunto', 50000, 10);
producto.crearProducto(4, "calza.jpg", 'calza', 32600, 12);
producto.crearProducto(5, "top.jpg", 'top', 30000, 5);
producto.crearProducto(6, "conjunto.jpg", 'conjunto', 50000, 10);
producto.crearProducto(7, "calza.jpg", 'calza', 32600, 12);
producto.crearProducto(8, "top.jpg", 'top', 30000, 5);
producto.crearProducto(9, "conjunto.jpg", 'conjunto', 50000, 5);


const btnBuscar = document.getElementById('btn-buscar')
btnBuscar.addEventListener('click', producto.buscarInput)
const input = document.getElementById('buscar')
input.addEventListener('input', producto.buscarInput)



// usuario1.crearUsuario("carol", "flexxus");
// usuario1.crearUsuario("irina", "bonnie");
// usuario1.crearUsuario("tomas", "futbol");
// usuario1.crearUsuario("tou", "skate");
// usuario1.buscarUsuario("tomas");
// usuario1.buscarUsuario("exe");
// usuario1.eliminarUsuario("irina");
// usuario1.modificarUsuario("tomas", "javier", "paddel");
// usuario1.modificarUsuario("irina", "celia", "flexxus");
