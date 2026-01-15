export function mostrarRankingFinal() {
    const jugadorActual = window.jugadorLogueado;
    const tabla = document.getElementById('cuerpo-ranking');
    const dineroFinal = document.getElementById('dinero-ranking-final');

    // actualiza la barra superior de la escena
    if (dineroFinal) dineroFinal.textContent = jugadorActual.dinero;
    pintarInventarioRanking('#inventario-ranking');

    // localstorage
    let historialRanking = JSON.parse(localStorage.getItem('rankingHeroes')) || [];

    // guardar la partida historial
    const nuevaPartida = {
        nombre: jugadorActual.nombre,
        puntos: jugadorActual.puntos,
        dinero: jugadorActual.dinero
    };
    historialRanking.push(nuevaPartida);

    // guarda de nuevo en localStorage
    localStorage.setItem('rankingHeroes', JSON.stringify(historialRanking));

    historialRanking.sort((a, b) => b.puntos - a.puntos);


    console.log("%cRanking ");
    console.table(historialRanking); 
  

   
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

    // boton reiniciar 
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