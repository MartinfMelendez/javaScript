/*Se debe crear una aplicacion en donde el jugador debe adivinar un numero del 0 al 10
El jugador tiene 3 intentos, en cada intento el sistema le indica si el numero ingresado
es mayor o menor al numero a adivinar.
El numero a adivinar se elige de forma aleatorea
Una vez que el jugador adivine el numero o se quede sin intentos el sistema le preguntara si desea volver a jugar
Se debera crear una funcion para validar si el numero ingresado por el usuario es valido y esta dentro del rango 0 a 10*/

const validarNumero = (num) => {
  if (isNaN(num) || num < 0 || num > 11) {
    alert(
      "El numero ingresado no es valdio o se encuentra fuera del rango 0 al 10"
    );
    return false;
  } else {
    return true;
  }
};

let continuar = true;
let cpu = Math.floor(Math.random() * 11);
let intentos = 3;

do {
  const numUser = parseInt(prompt("Ingrese un numero entre 0 y 10"));
  if (!validarNumero(numUser)) {
    continue;
  }

  if (cpu === numUser) {
    alert("Felicitaciones!. Adivinaste el numero");
    continuar = false;
  } else if (numUser < cpu) {
    alert("El numero ingresado es mas chico");
    intentos--;
  } else {
    alert("El numero ingresado es mas grande");
    intentos--;
  }

  if (intentos === 0) {
    alert("No has logrado adivinar el numero");
    continuar = false
  }
} while (continuar);
