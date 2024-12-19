/*Se debe crear un programa en el cual se permite cargar un nombre y la edad de la persona
  A demas se debe agregar la posibilidad de buscar y mostrar un mensaje en caso del que el nombre exista como asi si no existiera
  Se debe crear una funcion para poder eliminar un usuario
  Se debe validar que los datos que ingresa el usuario sean correcto y el usuario no puede tener mas de 110 años */

//Se crea una funcion constructora para el objeto
function Usuarios(nombre, apellido, email, contraseña) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.email = email;
  this.contraseña = contraseña;
}

//Se valida los datos que se reciben
const validarDatos = (nombre, apellido, email, contraseña) => {
  if (nombre === "" || apellido === "" || email === "" || contraseña === "") {
    alert("Debe de completar todos los datos solicitados");
    return false;
  } else {
    return true;
  }
};

//Se crea este array para almacenar los objetos
const listaUsuarios = [];

//Funcion para crear un usuario
function crearUsuario() {
  while (true) {
    //Se utilizan las funciones uppercase y trim para evitar mayusculas y espacios innecesarios
    let nombre = prompt("Ingrese el nombre").toUpperCase().trim();
    let apellido = prompt("Ingrese su apellido").toUpperCase().trim();
    let email = prompt("Ingrese su email").toUpperCase().trim();
    let contraseña = prompt("Ingrese su contraseña".trim());
    if (!validarDatos(nombre, apellido, email, contraseña)) {
      //Llamo a la funcion validar datos.
      continue;
    }

    let usuario = new Usuarios(nombre, apellido, email, contraseña);
    const existeUsuario = listaUsuarios.some(
      //Utilizo la funcion some para que el email ingresado no exista
      (x) => x.email === email
    );
    if (existeUsuario) {
      alert("Ya existe un usuario con este email. Verifique por favor");
      continue;
    } else {
      listaUsuarios.push(usuario); //Si el usuario ingresado no existe, lo agrega al array
    }
    console.table(listaUsuarios);
    if (!confirm("Desea crear otra cuenta?")) {
      break;
    }
  }
}

//Funcion para buscar un usuario
function buscarUsuario() {
  let email = prompt("Ingrese su email").toUpperCase().trim();
  let contraseña = prompt("Ingrese su contraseña").trim();

  const buscar = listaUsuarios.find(
    //Busco al usuario ingresado en el array
    (x) => x.email === email && x.contraseña === contraseña
  );
  if (!buscar) {
    alert("El usuario buscado no existe");
  } else {
    alert(`Nombre: ${buscar.nombre}, Apellido: ${buscar.apellido}`);
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
    alert("El usuario no se encuentra ");
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
  let email = prompt("Ingrese el mail del usuario que quiere modificar?").toUpperCase().trim();
  let contraseña = prompt("Ingrese su contraseña").trim();
  const buscarUsuario = listaUsuarios.find(
    (x) => x.email === email && x.contraseña === contraseña
  );
if(!buscarUsuario){
  alert('El usuario que intenta modificar no existe. Verifique Por favor')
} else {
  let newPassword = prompt('Ingrese su nueva contraseña')
  buscarUsuario.contraseña = newPassword
  alert('Se modifico correctamente la contraseña')
  console.table(listaUsuarios)
}
  }


//Se llama a la funcion crearUsuario
crearUsuario();

//Se llama a la funcion buscarUsuario
buscarUsuario();

//Se llama a la funcion eliminar usuario
eliminarUsuario();

//Se llama a la funcion modificar usuario
modificarContraseñaUsuario();
