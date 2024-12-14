/*Se debe crear un programa en el cual se permite cargar un nombre y la edad de la persona
  A demas se debe agregar la posibilidad de buscar y mostrar un mensaje en caso del que el nombre exista como asi si no existiera
  Se debe crear una funcion para poder eliminar un usuario
  Se debe validar que los datos que ingresa el usuario sean correcto y el usuario no puede tener mas de 110 años */

//Se crea una funcion constructora para el objeto
function Usuarios(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

//Se valida los datos que se reciben
const validarDatos = (nombre, edad) => {
  if (nombre === "" || edad < 1 || edad > 110 || isNaN(edad)) {
    alert("Debe ingresar un nombre o edad valido");
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
    let nombre = prompt("Ingrese el nombre").toUpperCase().trim(); //Se utilizan las funciones uppercase y trim para evitar mayusculas y espacios innecesarios
    let edad = parseInt(prompt("Ingrese su edad").trim());
    if (!validarDatos(nombre, edad)) {
      //Llamo a la funcion validar datos.
      continue;
    }

    let usuario = new Usuarios(nombre, edad);
    const existeUsuario = listaUsuarios.some(
      //Utilizo la funcion some para ver si el usuario y la edad ingresadas ya existe
      (x) => x.nombre === nombre && x.edad === edad
    );
    if (existeUsuario) {
      alert("El usuario ingresado ya existe");
      continue;
    } else {
      listaUsuarios.push(usuario); //Si el usuario ingresado no existe, lo agrega al array
    }
    console.table(listaUsuarios);
    if (!confirm("Desea ingresar otro usuario?")) {
      break;
    }
  }
}

//Funcion para buscar un usuario
function buscarUsuario() {
  let nombre = prompt("Que usuario quiere buscar?").toUpperCase().trim();
  let edad = parseInt(prompt("Ingrese su edad").trim());

  const buscar = listaUsuarios.find(
    //Busco al usuario ingresado en el array
    (x) => x.nombre === nombre && x.edad === edad
  );
  if (!buscar) {
    alert("El usuario buscado no existe");
  } else {
    alert(`Usuario encontrado ${buscar.nombre}, Edad: ${buscar.edad}`);
  }
}

//Funcion para eliminar un usuario
function eliminarUsuario() {
  let nombre = prompt("Ingrese el nombre").toUpperCase().trim();
  const buscarIndice = listaUsuarios.findIndex((x) => x.nombre === nombre); //Busco el indice del elemento que quiero eliminar
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

//Se llama a la funcion crearUsuario
crearUsuario();

//Se llama a la funcion buscarUsuario
buscarUsuario();

//Se llama a la funcion eliminar usuario
eliminarUsuario();
