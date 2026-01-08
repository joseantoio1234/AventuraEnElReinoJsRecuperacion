// regex formulario

import { validarNombre, validarPuntos } from "./modules/utils.js";

const formulario = document.getElementById('form-jugador');
const errorTexto = document.getElementById('error-msg');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById('nombre-input').value;
    const atq = document.getElementById('atq-input').value;
    const def = document.getElementById('def-input').value;
    const vida = document.getElementById('vida-input').value;

    if (!validarNombre(nombre)){
        errorTexto.textContent = "Nombre invalido (Tiene que empezar por mayusculas y maximo 20 caracteres)";
        return;
    }

    if (!validarPuntos(atq, def,vida)){
        errorTexto.textContent = "Reparto de puntos incorrecto(Maximo 110 puntos en total y vida 100)";
        return;
    }

    errorTexto.textContent = "";
    alert("¡Personaje creado correctamente!");

    document.getElementById('escena-1').classList.add('oculto');
    document.getElementById('escena-2').classList.remove('oculto');
})

// mercado
