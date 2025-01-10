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
    listaProductos.push(producto); //Si el producto ingresado no existe, lo agrega al array
  }

  //Al terminar de agregar el producto limpio los inputs para una nueva carga
  imagen.value = ''
  nombre.value = ''
  precio.value = ''
  stock.value = ''
  //Listo por consola en forma de tabla para visualizar lo que se agrega
  console.table(listaProductos);

}

//Funcion para buscar un usuario
function buscarUsuario() {
  let email = prompt("Ingrese el mail del usuario que quiere buscar")
    .toUpperCase()
    .trim();
  let contraseña = prompt("Ingrese su contraseña").trim();

  const buscar = listaUsuarios.find(
    //Busco al usuario ingresado en el array
    (x) => x.email === email && x.contraseña === contraseña
  );
  if (!buscar) {
    alert("El usuario o contraseña que ingreso no son correctos");
  } else {
    alert(
      `Los datos del usuario son: Nombre: ${buscar.nombre}- Apellido: ${buscar.apellido}`
    );
  }
}

//Funcion para eliminar un usuario
function eliminarUsuario() {
  let email = prompt("Que usuario quiere eliminar").toUpperCase().trim();
  let contraseña = prompt("Ingrese la contraseña").trim();
  const buscarIndice = listaUsuarios.findIndex(
    (x) => x.email === email && x.contraseña === contraseña
  ); //Busco el indice del elemento que quiero eliminar
  if (buscarIndice === -1) {
    alert("El usuario que intenta eliminar no existe");
  } else {
    //Elimino el usuario en base al indice que devuelve buscarIndice
    listaUsuarios.splice(buscarIndice, 1);
    alert("Usuario eliminado correctamente");
    //Muestro en consola el array sin el elemento eliminado
    console.table(listaUsuarios);
  }
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
const agregar = document.getElementById('agregar')

agregar.addEventListener('click', crearProducto)

//Se llama a la funcion crearUsuario
// crearUsuario();

//Se llama a la funcion buscarUsuario
// buscarUsuario();

//Se llama a la funcion eliminar usuario
// eliminarUsuario();

//Se llama a la funcion modificar usuario
// modificarContraseñaUsuario();
