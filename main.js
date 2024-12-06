/*Se debe crear una aplicacion en donde el jugador debe adivinar un numero del 0 al 10
El jugador tiene 3 intentos, en cada intento el sistema le indica si el numero ingresado
es mayor o menor al numero a adivinar.
El numero a adivinar se elige de forma aleatorea
Una vez que el jugador adivine el numero o se quede sin intentos el sistema le preguntara si desea volver a jugar
Se debera crear una funcion para validar si el numero ingresado por el usuario es valido y esta dentro del rango 0 a 10*/

const validarNumero = (num) => { // Funcion para validar el numero ingresado
  if (isNaN(num) || num < 0 || num > 10) {
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

const reiniciar = () => { //Funcion para reiniciar el juego
  intentos = 3;
  cpu = Math.floor(Math.random() * 11);
};

function adivinarNumero() { 
  console.log(cpu);
  console.log(intentos);
  do {
    const numUser = parseInt(prompt("Ingrese un numero entre 0 y 10"));
    if (!validarNumero(numUser)) { //Se llama a la funcion validar numero para ver si el numero que se ingreso es valido
      continue;
    }

    if (cpu === numUser) { //Es la condicion de victoria
      alert("Felicitaciones!. Adivinaste el numero");
      if (confirm("Desea jugar de nuevo")) { //Se usa un confirm para saber si el jugador desea volver a jugar
        reiniciar();
      } else {
        break;
      }
    } else if (numUser < cpu) {
      alert("El numero ingresado es mas chico");
      intentos--;
    } else {
      alert("El numero ingresado es mas grande");
      intentos--;
    }

    if (intentos > 0) {
      alert(`Te quedan ${intentos} intentos`);
    } else {
            if (confirm("No has logrado adivinar el numero. Desea jugar de nuevo?")) {
        reiniciar();
      } else {
        break;
      }
    }
  } while (continuar);
}
adivinarNumero();
