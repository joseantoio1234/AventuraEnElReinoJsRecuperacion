import { LISTA_ENEMIGOS } from './constants.js';

export function iniciarEscenaBatalla() {
    const contenedor = document.getElementById('contenedor-enemigos');
    const slots = document.querySelectorAll('#inventario-combate .slot');
    const dineroTexto = document.getElementById('dinero-combate');
    const jugador = window.jugadorLogueado;

    if (!contenedor || !jugador) return;

   
    if (dineroTexto) dineroTexto.textContent = jugador.dinero;
    
    slots.forEach((slot, i) => {
        slot.innerHTML = ""; 
        if (jugador.inventario[i]) {
            slot.innerHTML = `<img src="${jugador.inventario[i].imagen}" style="width:100%; height:100%; object-fit:contain;">`;
        }
    });

    // pintar los enemigos
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
}