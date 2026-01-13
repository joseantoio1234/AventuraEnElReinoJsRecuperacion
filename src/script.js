import { validarNombre, validarPuntos } from "./modules/utils.js";
import { pintarProductos } from './modules/mercado.js';
import { Jugador } from './modules/jugador.js';
import { botonConfirmar } from "./modules/mercado.js";
import { iniciarEscenaBatalla } from "./modules/batalla.js";




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

    const rutaImagen = "img/jugadorvikingo.png";
    window.jugadorLogueado = new Jugador(nombre, atq, def, vida, rutaImagen);

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
        botonConfirmar();
    } 
});

export function mostrarPerfil() {
    const contenedor = document.getElementById('tarjeta-jugador');
    const slotsPerfil = document.querySelectorAll('#inventario-perfil .slot');
    const jugador = window.jugadorLogueado;

    if (!jugador) return;
    
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

    // rellena inventario
    slotsPerfil.forEach(slot => slot.innerHTML = "");
    jugador.inventario.forEach((producto, indice) => {
        if (slotsPerfil[indice]) {
            slotsPerfil[indice].innerHTML = `<img src="${producto.imagen}" style="width:100%; height:100%; object-fit:contain;">`;
        }
    });
}


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