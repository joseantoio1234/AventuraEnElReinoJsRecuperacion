export function mostrarRankingFinal() {
    const jugadorActual = window.jugadorLogueado;
    const tabla = document.getElementById('cuerpo-ranking');
    const dineroFinal = document.getElementById('dinero-ranking-final');

    // 1. Actualizar barra inferior
    if (dineroFinal) dineroFinal.textContent = jugadorActual.dinero;
    pintarInventarioRanking('#inventario-ranking');

    // 2. GESTIÓN DE PERSISTENCIA: Cargar historial previo o crear uno nuevo
    // Usamos localStorage para que los datos no se borren al reiniciar
    let historialRanking = JSON.parse(localStorage.getItem('rankingHeroes')) || [];

    // 3. Guardar la partida actual en el historial
    const nuevaPartida = {
        nombre: jugadorActual.nombre,
        puntos: jugadorActual.puntos,
        dinero: jugadorActual.dinero
    };
    historialRanking.push(nuevaPartida);

    // 4. Guardar de nuevo en localStorage para la próxima vez
    localStorage.setItem('rankingHeroes', JSON.stringify(historialRanking));

    // 5. Ordenar de mayor a menor puntuación
    historialRanking.sort((a, b) => b.puntos - a.puntos);

    // 6. Rellenar la tabla con todas las partidas guardadas
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

    // Configurar el botón Reiniciar
    const btnReiniciar = document.getElementById('btn-reiniciar');
    if (btnReiniciar) {
        btnReiniciar.onclick = () => location.reload();
    }
}

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