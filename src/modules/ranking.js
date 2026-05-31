/**
 * @file ranking.js
 * @description Gestiona el guardado de puntuaciones y la visualización de la tabla de clasificación.
 */

/**
 * @function mostrarRankingFinal
 * @description Guarda la partida actual en el historial aplicando el bonus de monedas y dibuja la tabla de posiciones ordenada.
 */
export function mostrarRankingFinal() {
    const jugadorActual = window.jugadorLogueado;
    const tabla = document.getElementById('cuerpo-ranking');
    const dineroFinal = document.getElementById('dinero-ranking-final');

    // Actualiza la barra superior de la escena si existe el elemento
    if (dineroFinal) dineroFinal.textContent = jugadorActual.dinero;
    pintarInventarioRanking('#inventario-ranking');

    // Recupera el historial existente de localStorage o crea un array vacío
    let historialRanking = JSON.parse(localStorage.getItem('rankingHeroes')) || [];

    // --- REQUISITO EXTRA DE PUNTUACIÓN ---
    // A la puntuación total de las batallas se le suma el total de monedas restantes
    const puntuacionFinalConMonedas = jugadorActual.puntos + jugadorActual.dinero;

    // Guardar la nueva partida en el historial
    const nuevaPartida = {
        nombre: jugadorActual.nombre,
        puntos: puntuacionFinalConMonedas, // Puntuación total inflada con las monedas acumuladas
        dinero: jugadorActual.dinero       // Monedas exactas restantes para la columna de dinero
    };
    historialRanking.push(nuevaPartida);

    // Guarda el historial actualizado de vuelta en el localStorage
    localStorage.setItem('rankingHeroes', JSON.stringify(historialRanking));

    // Ordena el ranking de mayor a menor puntuación final
    historialRanking.sort((a, b) => b.puntos - a.puntos);

    console.log("%cRanking Actualizado");
    console.table(historialRanking); 
  
    // Genera visualmente las filas en la tabla del HTML
    if (tabla) {
        tabla.innerHTML = ""; 
        historialRanking.forEach(partida => {
            const fila = `
                <tr>
                    <td>${partida.nombre}</td>
                    <td>${partida.puntos}</td>
                    <td>${partida.dinero}</td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    }

    // Botón reiniciar 
    const btnReiniciar = document.getElementById('btn-reiniciar');
    if (btnReiniciar) {
        btnReiniciar.onclick = () => location.reload();
    }
}

/**
 * @function pintarInventarioRanking
 * @description Muestra visualmente los objetos que el jugador tenía al final de la partida.
 * @param {string} selector - El ID o clase del contenedor de inventario.
 */
function pintarInventarioRanking(selector) {
    const jugador = window.jugadorLogueado;
    const slots = document.querySelectorAll(`${selector} .slot`);
    slots.forEach((slot, i) => {
        slot.innerHTML = ""; 
        if (jugador.inventario[i]) {
            slot.innerHTML = `<img src="${jugador.inventario[i].imagen}" style="width:100%; height:100%; object-fit:contain;">`;
        }
    });
}