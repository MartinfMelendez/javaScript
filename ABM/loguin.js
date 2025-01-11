/*Se debe crear un programa en el cual se permite cargar un nombre y la edad de la persona
  A demas se debe agregar la posibilidad de buscar y mostrar un mensaje en caso del que el nombre exista como asi si no existiera
  Se debe crear una funcion para poder eliminar un usuario
  Se debe validar que los datos que ingresa el usuario sean correcto y el usuario no puede tener mas de 110 años */

//Se crea una funcion constructora para el objeto
function Productos(id, imagen, nombre, precio, stock) {
  this.id = id,
    this.imagen = imagen,
    this.nombre = nombre,
    this.precio = precio,
    this.stock = stock;
}

//Se valida los datos que se reciben
const validarDatos = (img, nombre, precio, stock) => {
  if (img === "" || nombre === "" || isNaN(precio) || isNaN(stock)) {
    alert("Debe de completar todos los datos solicitados");
    return false;
  } else {
    return true;
  }
};

const limpiarCampos = () => {
  const imagen = document.getElementById('img')
  const nombre = document.getElementById('nombre')
  const precio = document.getElementById('precio')
  const stock = document.getElementById('stock')
  const producto = document.getElementById('buscador')
  const eliminar = document.getElementById('eliminar')


  imagen.value = ''
  nombre.value = ''
  precio.value = ''
  stock.value = ''
  producto.value = ''
  eliminar.value = ''

}
//Se crea este array para almacenar los objetos
const listaProductos = [];

//Funcion para crear un usuario
function crearProducto() {

  //Se crean variables para referenciar los elementos del HTML
  let imagen = document.getElementById('img')
  let nombre = document.getElementById('nombre')
  let precio = document.getElementById('precio')
  let stock = document.getElementById('stock')

  if (!validarDatos(imagen.value.trim().toUpperCase, nombre.value.trim().toUpperCase(), parseFloat(precio.value.trim()), parseInt(stock.value.trim()))) {
    //Llamo a la funcion validar datos.
    return
  }

  let id = listaProductos.length > 0 ? listaProductos[listaProductos.length - 1].id + 1 : 1

  let producto = new Productos(id, imagen.value.trim().toUpperCase(), nombre.value.trim().toUpperCase(), parseFloat(precio.value.trim()), parseInt(stock.value.trim()));

  const existeProducto = listaProductos.some(
    //Utilizo la funcion some para que el producto ingresado no exista
    (x) => x.nombre === nombre.value
  );
  if (existeProducto) {
    //Si el producto ingresado ya se encuentra dentro del array no se permite agregar el nuevo objeto
    alert("Ya existe un producto con este nombre. Verifique por favor");

  } else {
    listaProductos.push(producto)//Si el producto ingresado no existe, lo agrega al array
    let productosJson = JSON.stringify(listaProductos)
    localStorage.setItem('productos', productosJson);
  }

  //Al terminar de agregar el producto limpio los inputs para una nueva carga
  limpiarCampos()
  //Listo por consola en forma de tabla para visualizar lo que se agrega
  console.table(listaProductos);

let contenedor = document.querySelector('.card')
contenedor.innerHTML += `<h4> ${producto.nombre}</h4>
<p>Precio:$${producto.precio}</p>
<p>Stock: ${producto.stock}</p>`

document.body.appendChild(contenedor)

}

//Funcion para buscar un usuario
function buscarProducto() {

  let producto = document.getElementById('buscador')

  const buscar = listaProductos.find(
    //Busco al usuario ingresado en el array
    (x) => x.nombre === producto.value.toUpperCase().trim()//Se utiliza estas propiedades para controlar lo que se carga
  );
  if (!buscar) {
    alert("El producto buscado no se encuentra");
  } else {
    alert(
      `Detalles del producto Nombre: ${buscar.nombre}- Precio: ${buscar.precio}`
    );
  }
  limpiarCampos()
}

//Funcion para eliminar un usuario
function eliminarProducto() {
  let producto = document.getElementById('eliminar')
  const buscarIndice = listaProductos.findIndex(
    (x) => x.nombre === producto.value.trim().toUpperCase()
  ); //Busco el indice del elemento que quiero eliminar
  if (buscarIndice === -1) {
    alert("El producto que intenta eliminar no existe");
  } else {
    //Elimino el usuario en base al indice que devuelve buscarIndice
    listaProductos.splice(buscarIndice, 1);
    alert("Producto eliminado correctamente");
    //Muestro en consola el array sin el elemento eliminado
    console.table(listaProductos);
  }
  limpiarCampos()
}

//Funcion para poder modificar un usuario agregado
function modificarContraseñaUsuario() {
  let email = prompt("Ingrese el mail del usuario que quiere modificar?")
    .toUpperCase()
    .trim();
  let contraseña = prompt("Ingrese su contraseña").trim();
  const buscarUsuario = listaUsuarios.find(
    //Uso el metodo find() para buscar el usuario
    (x) => x.email === email && x.contraseña === contraseña
  );
  if (!buscarUsuario) {
    alert("El usuario que intenta modificar no existe. Verifique Por favor");
  } else {
    let newPassword = prompt("Ingrese su nueva contraseña");
    buscarUsuario.contraseña = newPassword; //Se modifica la contraseña del usuario ingresado
    alert("Se modifico correctamente la contraseña");
    console.table(listaUsuarios);
  }
}
debugger

const agregar = document.getElementById('agregar')
agregar.addEventListener('click', crearProducto)

const buscar = document.getElementById('buscar')
buscar.addEventListener('click', buscarProducto)

const eliminar = document.getElementById('btn-eliminar')
eliminar.addEventListener('click', eliminarProducto)


//Se llama a la funcion crearUsuario
// crearUsuario();

//Se llama a la funcion buscarUsuario
// buscarUsuario();

//Se llama a la funcion eliminar usuario
// eliminarUsuario();

//Se llama a la funcion modificar usuario
// modificarContraseñaUsuario();