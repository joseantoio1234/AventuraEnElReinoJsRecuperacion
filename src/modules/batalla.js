import { LISTA_ENEMIGOS } from './constants.js';
// IMPORTANTE: Importamos la función del archivo de ranking
import { mostrarRankingFinal } from './ranking.js';

let combatesRealizados = 0;
const MAX_COMBATES = 3;

// --- FUNCIÓN DE APOYO PARA PINTAR EL INVENTARIO ---
function actualizarInventarioVisual(selectorPadre) {
    const jugador = window.jugadorLogueado;
    const slots = document.querySelectorAll(`${selectorPadre} .slot`);
    
    slots.forEach((slot, i) => {
        slot.innerHTML = ""; 
        if (jugador.inventario[i]) {
            slot.innerHTML = `<img src="${jugador.inventario[i].imagen}" style="width:100%; height:100%; object-fit:contain; display:block;">`;
        }
    });
}

export function iniciarEscenaBatalla() {
    const contenedor = document.getElementById('contenedor-enemigos');
    const jugador = window.jugadorLogueado;

    if (!contenedor || !jugador) return;

    combatesRealizados = 0;
    actualizarInventarioVisual('#inventario-combate');

    contenedor.innerHTML = "";
    LISTA_ENEMIGOS.forEach(enemigo => {
        const carta = document.createElement('div');
        carta.className = 'carta-enemigo';
        carta.innerHTML = `
            <img src="${enemigo.imagen}" alt="${enemigo.nombre}">
            <h3>${enemigo.nombre}</h3>
            <p>${enemigo.atq} puntos de ataque</p>
        `;
        contenedor.appendChild(carta);
    });

    const btnLuchar = document.getElementById('btn-luchar');
    if (btnLuchar) {
        btnLuchar.onclick = () => {
            document.getElementById('escena-4').classList.add('oculto');
            document.getElementById('escena-5').classList.remove('oculto');
            iniciarPelea();
        };
    }
}

export function iniciarPelea() {
    const jugador = window.jugadorLogueado;
    combatesRealizados++;

    actualizarInventarioVisual('#inventario-combate-5');

    const enemigo = LISTA_ENEMIGOS[Math.floor(Math.random() * LISTA_ENEMIGOS.length)];
    
    document.getElementById('img-jugador-combate').src = jugador.imagen;
    document.getElementById('nombre-jugador-combate').textContent = jugador.nombre;
    document.getElementById('img-enemigo-combate').src = enemigo.imagen;
    document.getElementById('nombre-enemigo-combate').textContent = enemigo.nombre;

    let vidaJ = jugador.vida;
    let vidaE = enemigo.vida;

    while (vidaJ > 0 && vidaE > 0) {
        // Fórmula del PDF: (vida + defensa) - ataque
        vidaJ = (vidaJ + jugador.def) - enemigo.atq;
        if (vidaJ > 0) {
            vidaE = vidaE - jugador.atq;
        }
    }

    let ganador = "";
    let puntos = 0;

    if (vidaJ > 0) {
        ganador = jugador.nombre;
        puntos = enemigo.calcularPuntosRecompensa(); 
        jugador.puntos += puntos; 
    } else {
        ganador = enemigo.nombre;
        puntos = 0;
    }

    const boxResultado = document.getElementById('resultado-combate');
    boxResultado.classList.remove('oculto');
    document.getElementById('ganador-texto').textContent = `Ganador: ${ganador}`;
    document.getElementById('puntos-ganados').textContent = `Puntos ganados: ${puntos}`;

    const btnContinuar = document.getElementById('btn-continuar-ranking');
    if (btnContinuar) {
        btnContinuar.onclick = () => {
            boxResultado.classList.add('oculto');

            if (combatesRealizados < MAX_COMBATES) {
                iniciarPelea();
            } else {
                document.getElementById('escena-5').classList.add('oculto');
                document.getElementById('escena-6').classList.remove('oculto');
                mostrarPantallaFinal(); 
            }
        };
    }
}

function mostrarPantallaFinal() {
    const jugador = window.jugadorLogueado;
    const rangoTexto = document.getElementById('rango-final');
    const puntosDisplay = document.getElementById('puntos-finales-display');

    puntosDisplay.textContent = jugador.puntos;

    if (jugador.puntos >= 400) {
        rangoTexto.textContent = "El Jugador ha logrado ser un PRO";
    } else {
        rangoTexto.textContent = "El Jugador ha resultado ser un Rookie";
    }

    actualizarInventarioVisual('#inventario-final');

    // CONFIGURACIÓN DEL BOTÓN PARA IR AL RANKING
    const btnVerClasificacion = document.getElementById('btn-ver-ranking');
    if (btnVerClasificacion) {
        btnVerClasificacion.onclick = () => {
            document.getElementById('escena-6').classList.add('oculto');
            document.getElementById('escena-7').classList.remove('oculto');
            // Llamamos a la función que está en ranking.js
            mostrarRankingFinal(); 
        };
    }
}