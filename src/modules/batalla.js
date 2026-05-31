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
 * @description Ejecuta la lógica del combate por turnos, activa las animaciones y gestiona los puntos y monedas ganadas.
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

    // Lógica de animación de los luchadores
    imgJugador.classList.remove('animar-entrada-jugador');
    imgEnemigo.classList.remove('animar-entrada-enemigo');
    
    void imgJugador.offsetWidth; // Reinicia la animación 

    imgJugador.classList.add('animar-entrada-jugador');
    imgEnemigo.classList.add('animar-entrada-enemigo');

    // --- REINICIAR ANIMACIÓN DE LAS MONEDAS EN CADA COMBATE ---
    const monedas = [
        document.getElementById('moneda-1'),
        document.getElementById('moneda-2'),
        document.getElementById('moneda-3')
    ];

    monedas.forEach(moneda => {
        if (moneda) {
            moneda.classList.remove('caida-moneda');
            void moneda.offsetWidth; // Forzar reflow técnico para resetear la línea de tiempo del CSS
            moneda.classList.add('caida-moneda');
        }
    });

    // --- CÁLCULO DE TURNOS CORREGIDO (Evita bucle infinito si la defensa es alta) ---
    let vidaJ = jugador.vida;
    let vidaE = enemigo.vida;

    while (vidaJ > 0 && vidaE > 0) {
        // El daño se mitiga con la defensa, pero el daño mínimo por turno es 0
        const dañoRecibido = enemigo.atq - jugador.def;
        vidaJ -= (dañoRecibido > 0) ? dañoRecibido : 0;
        
        if (vidaJ > 0) {
            vidaE = vidaE - jugador.atq;
        }
    }

    let ganador = vidaJ > 0 ? jugador.nombre : enemigo.nombre;
    let puntos = 0;
    let monedasExtra = 0;
    
    // --- LÓGICA DE RECOMPENSAS (1 PUNTO EXTRA) ---
    if (vidaJ > 0) {
        // Puntos base + ataque enemigo
        puntos = enemigo.calcularPuntosRecompensa();
        jugador.puntos += puntos; 

        // Si el enemigo tiene la propiedad multiplicador, sabemos de forma segura que es un Jefe
        if (enemigo.multiplicador) {
            monedasExtra = 10;
        } else {
            monedasExtra = 5;
        }
        jugador.dinero += monedasExtra;
    }

    const boxResultado = document.getElementById('resultado-combate');
    boxResultado.classList.add('oculto'); 

    // Visualización de resultados en la caja
    setTimeout(() => {
        boxResultado.classList.remove('oculto');
        document.getElementById('ganador-texto').textContent = `Ganador: ${ganador}`;
        
        // Si el jugador ganó, mostramos los puntos y las monedas añadidas al monedero
        if (vidaJ > 0) {
            document.getElementById('puntos-ganados').innerHTML = `
                Puntos ganados: ${puntos}<br>
                ¡Recompensa extra: +${monedasExtra} monedas de oro!
            `;
        } else {
            document.getElementById('puntos-ganados').textContent = `Puntos ganados: 0`;
        }
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

                // Efecto confeti
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