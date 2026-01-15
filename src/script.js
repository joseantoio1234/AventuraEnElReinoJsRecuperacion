/**
 * @file script.js
 * @description Archivo principal que gestiona el flujo de escenas y el registro del jugador.
 */

import { validarNombre, validarPuntos } from "./modules/utils.js";
import { pintarProductos, botonConfirmar } from './modules/mercado.js';
import { Jugador } from './modules/jugador.js';
import { iniciarEscenaBatalla } from "./modules/batalla.js";

const formulario = document.getElementById('form-jugador');
const errorTexto = document.getElementById('error-msg');
const dineroDisplay = document.getElementById('dinero-display');

/** @type {Object|null} Jugador global de la sesión */
window.jugadorLogueado = null;

// formulario
if (formulario) {
    /**
     * @description Maneja el registro del jugador y valida sus estadísticas.
     * @param {Event} evento - Evento de envío del formulario.
     */
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById('nombre-input').value;
        const atq = document.getElementById('atq-input').value;
        const def = document.getElementById('def-input').value;
        const vida = document.getElementById('vida-input').value;

        if (!validarNombre(nombre)){
            errorTexto.textContent = "Nombre incorrecto, empezar por mayuscula (20 caracteres max).";
            return;
        }

        if (!validarPuntos(atq, def, vida)) {
            errorTexto.textContent = "La suma de los puntos max 110 (vida 100p min).";
            return;
        }

        errorTexto.textContent = "";

        const rutaImagen = "img/jugadorvikingo.png";
    
        window.jugadorLogueado = new Jugador(nombre, Number(atq), Number(def), Number(vida), rutaImagen);

        // logica de escenas
        document.getElementById('escena-1').classList.add('oculto');
        document.getElementById('escena-1.5').classList.remove('oculto');

        pintarPreviaPerfil(); 
    });
}

/**
 * @function pintarPreviaPerfil
 * @description Muestra los datos iniciales del vikingo antes de ir al mercado.
 */
// datos
function pintarPreviaPerfil() {
    const contenedor = document.getElementById('tarjeta-previa');
    const jugador = window.jugadorLogueado;

    if (!jugador || !contenedor) return;

    contenedor.innerHTML = `
        <img src="${jugador.imagen}" alt="Vikingo" style="width: 120px; border-radius: 10px; display:block; margin: 0 auto;">
        <div class="stats-finales" style="text-align: center; margin-top: 15px;">
            <p><strong>Nombre:</strong> ${jugador.nombre}</p>
            <p><strong>Ataque Inicial:</strong> ${jugador.atq}</p>
            <p><strong>Defensa Inicial:</strong> ${jugador.def}</p>
            <p><strong>Vida:</strong> ${jugador.vida}</p>
        </div>
    `;
}

// boton
const btnIrMercado = document.getElementById('btn-ir-mercado');
if (btnIrMercado) {
    /**
     * @description Cambia a la escena del mercado y carga los productos.
     */
    btnIrMercado.addEventListener('click', () => {
        document.getElementById('escena-1.5').classList.add('oculto');
        document.getElementById('escena-2').classList.remove('oculto');

        if (dineroDisplay) {
            dineroDisplay.textContent = window.jugadorLogueado.dinero;
        }

        pintarProductos();
        botonConfirmar();
    });
}

/**
 * @function mostrarPerfil
 * @description Actualiza y muestra el perfil del jugador con sus bonus e inventario final.
 */
// perfil
export function mostrarPerfil() {
    const contenedor = document.getElementById('tarjeta-jugador');
    const slotsPerfil = document.querySelectorAll('#inventario-perfil .slot');
    const jugador = window.jugadorLogueado;

    if (!jugador || !contenedor) return;
    
    contenedor.innerHTML = `
        <div class="detalles-vikingo">
            <img src="${jugador.imagen}" alt="Vikingo" style="width: 100px; height: auto; border-radius: 10px;">
            <div class="stats-finales">
                <p><strong>Nombre:</strong> ${jugador.nombre}</p>
                <p><strong>Ataque Total:</strong> ${jugador.atq}</p> 
                <p><strong>Defensa Total:</strong> ${jugador.def}</p>
                <p><strong>Vida:</strong> ${jugador.vida}</p>
            </div>
        </div>
    `;

    slotsPerfil.forEach(slot => slot.innerHTML = "");
    jugador.inventario.forEach((producto, indice) => {
        if (slotsPerfil[indice]) {
            slotsPerfil[indice].innerHTML = `<img src="${producto.imagen}" style="width:100%; height:100%; object-fit:contain;">`;
        }
    });
}

// logica de escena
const btnIrBatalla = document.getElementById('btn-ir-batalla');
if (btnIrBatalla) {
    /**
     * @description Cambia de la vista de perfil a la selección de enemigos.
     */
    btnIrBatalla.addEventListener('click', () => {
        const escena3 = document.getElementById('escena-3');
        const escena4 = document.getElementById('escena-4');

        if (escena3 && escena4) {
            escena3.classList.add('oculto');
            escena4.classList.remove('oculto');
            iniciarEscenaBatalla(); 
        }
    });
}