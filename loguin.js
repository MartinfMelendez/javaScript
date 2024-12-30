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
    let nombre = prompt("Ingrese su nombre").toUpperCase().trim();
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
    if (existeUsuario) {//Si el mail ingresado ya se encuentra dentro del array no se permite agregar el nuevo objeto
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
  let email = prompt("Ingrese el mail del usuario que quiere buscar").toUpperCase().trim();
  let contraseña = prompt("Ingrese su contraseña").trim();

  const buscar = listaUsuarios.find(
    //Busco al usuario ingresado en el array
    (x) => x.email === email && x.contraseña === contraseña
  );
  if (!buscar) {
    alert("El usuario o contraseña que ingreso no son correctos");
  } else {
    alert(`Los datos del usuario son: Nombre: ${buscar.nombre}- Apellido: ${buscar.apellido}`);
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
  let email = prompt("Ingrese el mail del usuario que quiere modificar?").toUpperCase().trim();
  let contraseña = prompt("Ingrese su contraseña").trim();
  const buscarUsuario = listaUsuarios.find(//Uso el metodo find() para buscar el usuario
    (x) => x.email === email && x.contraseña === contraseña
  );
if(!buscarUsuario){
  alert('El usuario que intenta modificar no existe. Verifique Por favor')
} else {
  let newPassword = prompt('Ingrese su nueva contraseña')
  buscarUsuario.contraseña = newPassword //Se modifica la contraseña del usuario ingresado
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



//Se crea una clase Usuarios
class Usuarios {
  //Se crea un constructor para la clase
  constructor(email, contraseña) {
    (this.email = email), (this.contraseña = contraseña);
  }
  //Se crea un metodo el cual se encarga de validar los datos ingresados
  validarDatos(nombre, contraseña) {
    if (nombre === "" || contraseña === "") {
      console.log("Se debe de completar todos los campos");
      return false;
    } else {
      return true;
    }
  }
  //Se crea un metodo el cual se encarga de crear un nuevo usuario
  crearUsuario(email, contraseña) {
    if (this.validarDatos(email, contraseña)) {
      usuario.push(new Usuarios(email, contraseña));
      console.table(usuario);
    }
  }
  //Se crea un metodo para buscar un usuario
  buscarUsuario(email) {
    const buscar = usuario.find((x) => x.email === email);
    if (!buscar) {
      console.log("El email ingresado no existe");
    } else {
      console.log(`Esta es la clave de ${buscar.email}: ${buscar.contraseña}`);
    }
  }
  //Se crea un metodo para eliminar un usuario
  eliminarUsuario(email) {
    //Se crea una variaable para buscar el indice del usuario que queremos eliminar
    const eliminar = usuario.findIndex((x) => x.email === email);
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

const usuario = [];

usuario1 = new Usuarios();
usuario1.crearUsuario("martin", "");
usuario1.crearUsuario("martin", "tita");
usuario1.crearUsuario("carol", "flexxus");
usuario1.crearUsuario("irina", "bonnie");
usuario1.crearUsuario("tomas", "futbol");
usuario1.crearUsuario("tou", "skate");
usuario1.buscarUsuario("tomas");
usuario1.buscarUsuario("exe");
usuario1.eliminarUsuario("irina");
usuario1.modificarUsuario("tomas", "javier", "paddel");
usuario1.modificarUsuario("irina", "celia", "flexxus");