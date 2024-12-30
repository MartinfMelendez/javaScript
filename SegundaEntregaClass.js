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
