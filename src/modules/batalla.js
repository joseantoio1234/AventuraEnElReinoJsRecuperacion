/**
 * @file batalla.js
 * @description Controla la lógica de los combates, las animaciones de los luchadores y el cálculo de resultados.
 */

import { LISTA_ENEMIGOS } from './constants.js';
import { mostrarRankingFinal } from './ranking.js';

let combatesRealizados = 0;
const MAX_COMBATES = 3;

/**
 * @function actualizarInventarioVisual
 * @description Dibuja los objetos del jugador en los slots correspondientes de la escena de batalla.
 * @param {string} selectorPadre - El ID o clase del contenedor donde se encuentran los slots.
 */
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

/**
 * @function iniciarEscenaBatalla
 * @description Prepara la escena previa al combate mostrando la lista de posibles enemigos.
 */
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

/**
 * @function iniciarPelea
 * @description Ejecuta la lógica del combate por turnos, activa las animaciones y gestiona los puntos ganados.
 */
export function iniciarPelea() {
    const jugador = window.jugadorLogueado;
    combatesRealizados++;

    actualizarInventarioVisual('#inventario-combate-5');

    const enemigo = LISTA_ENEMIGOS[Math.floor(Math.random() * LISTA_ENEMIGOS.length)];
    
    const imgJugador = document.getElementById('img-jugador-combate');
    const imgEnemigo = document.getElementById('img-enemigo-combate');

    imgJugador.src = jugador.imagen;
    document.getElementById('nombre-jugador-combate').textContent = jugador.nombre;
    imgEnemigo.src = enemigo.imagen;
    document.getElementById('nombre-enemigo-combate').textContent = enemigo.nombre;

    // logica de animacion
    imgJugador.classList.remove('animar-entrada-jugador');
    imgEnemigo.classList.remove('animar-entrada-enemigo');
    
    void imgJugador.offsetWidth; // reinicia la animacion 

    imgJugador.classList.add('animar-entrada-jugador');
    imgEnemigo.classList.add('animar-entrada-enemigo');

    

    let vidaJ = jugador.vida;
    let vidaE = enemigo.vida;

    while (vidaJ > 0 && vidaE > 0) {
        vidaJ = (vidaJ + jugador.def) - enemigo.atq;
        if (vidaJ > 0) {
            vidaE = vidaE - jugador.atq;
        }
    }

    let ganador = vidaJ > 0 ? jugador.nombre : enemigo.nombre;
    let puntos = vidaJ > 0 ? enemigo.calcularPuntosRecompensa() : 0;
    
    if (vidaJ > 0) {
        jugador.puntos += puntos; 
    }

    const boxResultado = document.getElementById('resultado-combate');
    boxResultado.classList.add('oculto'); 

    // time out
    setTimeout(() => {
        boxResultado.classList.remove('oculto');
        document.getElementById('ganador-texto').textContent = `Ganador: ${ganador}`;
        document.getElementById('puntos-ganados').textContent = `Puntos ganados: ${puntos}`;
    }, 0);

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

                // confeti
                if (jugador.puntos >= 300) {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        zIndex: 999
                    });
                }
            }
        };
    }
}

/**
 * @function mostrarPantallaFinal
 * @description Muestra el resumen de puntos y el rango alcanzado (PRO o Rookie) antes del ranking.
 */
function mostrarPantallaFinal() {
    const jugador = window.jugadorLogueado;
    const rangoTexto = document.getElementById('rango-final');
    const puntosDisplay = document.getElementById('puntos-finales-display');

    puntosDisplay.textContent = jugador.puntos;

    if (jugador.puntos >= 300) {
        rangoTexto.textContent = "El Jugador ha logrado ser un PRO";
    } else {
        rangoTexto.textContent = "El Jugador ha resultado ser un Rookie";
    }

    actualizarInventarioVisual('#inventario-final');

    const btnVerClasificacion = document.getElementById('btn-ver-ranking');
    if (btnVerClasificacion) {
        btnVerClasificacion.onclick = () => {
            document.getElementById('escena-6').classList.add('oculto');
            document.getElementById('escena-7').classList.remove('oculto');
            mostrarRankingFinal(); 
        };
    }
}