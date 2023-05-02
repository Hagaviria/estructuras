import {resolverTorneo} from './util.js'

const btnIngresar = document.getElementById("ingresar");

btnIngresar.addEventListener('click', ingresarTorneo);

let salida = document.getElementById("salida");


function ingresarTorneo(){
  let torneo = document.getElementById("elTorneo").value;
  let salida = resolverTorneo(torneo);
  document.getElementById("salida").innerHTML = salida;

}






