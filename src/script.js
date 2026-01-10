import { validarNombre, validarPuntos } from "./modules/utils.js";
import { pintarProductos } from './modules/mercado.js';
import { Jugador } from './modules/jugador.js';


const formulario = document.getElementById('form-jugador');
const errorTexto = document.getElementById('error-msg');
const dineroDisplay = document.getElementById('dinero-display');

window.jugadorLogueado = null;

// formulario
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById('nombre-input').value;
    const atq = document.getElementById('atq-input').value;
    const def = document.getElementById('def-input').value;
    const vida = document.getElementById('vida-input').value;

    // regex
    if (!validarNombre(nombre)){
        errorTexto.textContent = "Nombre incorrecto, empezar por mayuscula (20 caracteres max).";
        return;
    }

    if (!validarPuntos(atq, def, vida)) {
        errorTexto.textContent = "La suma de los puntos max 110 (vida 100p min).";
        return;
    }

    errorTexto.textContent = "";

    window.jugadorLogueado = new Jugador(nombre, atq, def, vida);

    // cambio de escena
    const escena1 = document.getElementById('escena-1');
    const escena2 = document.getElementById('escena-2');

    if (escena1 && escena2) {
        escena1.classList.add('oculto');
        escena2.classList.remove('oculto');

        // dinero
        if (dineroDisplay){
            dineroDisplay.textContent = window.jugadorLogueado.dinero;
        }

        pintarProductos();  
    } 
});




