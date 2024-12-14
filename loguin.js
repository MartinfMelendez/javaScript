/*Se debe crear un programa en el cual se permite cargar un nombre y la edad de la persona
  A demas se debe agregar la posibilidad de buscar y mostrar un mensaje en caso del que el nombre exista como asi si no existiera
  Se debe validar que los datos que ingresa el usuario sean correcto y el usuario no puede tener mas de 110 años */

function Usuarios(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

const validarDatos = (nombre, edad) => {
  if (nombre === "" || edad < 1 || edad > 110 || isNaN(edad)) {
    alert("Debe ingresar un nombre o edad valido");
    return false;
  } else {
    return true;
  }
};

const listaUsuarios = [];

function crearUsuario() {
  while (true) {
    let nombre = prompt("Ingrese el nombre").toUpperCase().trim();
    let edad = parseInt(prompt("Ingrese su edad").trim());
    if (!validarDatos(nombre, edad)) {
      continue;
    }

    let usuario = new Usuarios(nombre, edad);
    const existeUsuario = listaUsuarios.some(
      (x) => x.nombre === nombre && x.edad === edad
    );
    if (existeUsuario) {
      alert("El usuario ingresado ya existe");
      continue;
    } else {
      listaUsuarios.push(usuario);
    }

    if (!confirm("Desea ingresar otro usuario?")) {
      break;
    }
  }
}
crearUsuario();
console.table(listaUsuarios);

function buscarUsuario(nombre) {
  const buscar = listaUsuarios.find((x) => x.nombre === nombre);
  if (!buscar) {
    alert("El usuario buscado no existe");
  } else {
    alert(`Usuario encontrado`);
  }
}

buscarUsuario(prompt("Que usuario quiere buscar?").toUpperCase().trim());
function eliminarUsuario() {}
