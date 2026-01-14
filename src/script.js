import { validarNombre, validarPuntos } from "./modules/utils.js";
import { pintarProductos, botonConfirmar } from './modules/mercado.js';
import { Jugador } from './modules/jugador.js';
import { iniciarEscenaBatalla } from "./modules/batalla.js";

const formulario = document.getElementById('form-jugador');
const errorTexto = document.getElementById('error-msg');
const dineroDisplay = document.getElementById('dinero-display');

window.jugadorLogueado = null;

// FORMULARIO (ESCENA 1)
if (formulario) {
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
        // Convertimos a Number para evitar errores en combate
        window.jugadorLogueado = new Jugador(nombre, Number(atq), Number(def), Number(vida), rutaImagen);

        // NAVEGACIÓN: De 1 a 1.5
        document.getElementById('escena-1').classList.add('oculto');
        document.getElementById('escena-1.5').classList.remove('oculto');

        pintarPreviaPerfil(); 
    });
}

// FUNCIÓN PARA PINTAR LOS DATOS (ESCENA 1.5)
function pintarPreviaPerfil() {
    const contenedor = document.getElementById('tarjeta-previa');
    const jugador = window.jugadorLogueado;

    if (!jugador || !contenedor) return;

    // Estilo idéntico a tu perfil pero sin inventario
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

// BOTÓN IR AL MERCADO (ESCENA 1.5 a 2)
// Cambiamos el ID para que coincida con tu HTML
const btnIrMercado = document.getElementById('btn-ir-mercado');
if (btnIrMercado) {
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

// MOSTRAR PERFIL DEFINITIVO (ESCENA 3)
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

// BOTÓN IR A BATALLA (ESCENA 3 a 4) - SOLUCIÓN AL ERROR
const btnIrBatalla = document.getElementById('btn-ir-batalla');
if (btnIrBatalla) {
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