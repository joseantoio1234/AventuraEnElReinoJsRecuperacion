/**
 * @file mercado.js
 * @description Gestiona la visualización de productos, la lógica de compra y la animación de confirmación.
 */

import { mostrarPerfil } from '../script.js';
import { PRODUCTOS_MERCADO } from './constants.js';

/**
 * @function animarIconoCompra
 * @description Crea y anima un icono de verificación en la posición donde el usuario hizo clic.
 * @param {MouseEvent} evento - El evento del clic para obtener las coordenadas.
 */
// animacion de compra
function animarIconoCompra(evento) {
    const icono = document.createElement('div');
    icono.className = 'icono-compra';
    icono.innerText = '✔️'; 

    // posicionamiento del click
    icono.style.left = evento.pageX + 'px';
    icono.style.top = evento.pageY + 'px';

    document.body.appendChild(icono);

    setTimeout(() => {
        icono.remove();
    }, 1000);
}

/**
 * @function pintarProductos
 * @description Genera visualmente las tarjetas de productos disponibles en el mercado.
 */
export function pintarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    contenedor.innerHTML = "";

    PRODUCTOS_MERCADO.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';

        let nombreEstadistica = "";
        if (producto.tipo === "Arma"){
            nombreEstadistica = "Ataque";
        } else if (producto.tipo === "Armadura"){
            nombreEstadistica = "Defensa";
        } else if (producto.tipo === "Consumible"){
            nombreEstadistica = "Vida"; 
        }

        tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="rareza">${producto.rareza}</p>
        <p class="bonus" style="color: yellow;">${nombreEstadistica}: +${producto.bonus}</p>
        <p class="precio"><strong>${producto.precio}</strong>€</p>
        <button class="btn-add" data-id="${producto.id}">Añadir</button>
        `;

        contenedor.appendChild(tarjeta);

        const boton = tarjeta.querySelector('.btn-add');
        boton.addEventListener('click', (e) => {
            gestionarCompra(producto, tarjeta, boton, e);
        });
    });
}

/**
 * @function gestionarCompra
 * @description Maneja la lógica de añadir o quitar productos del inventario y cobrar el dinero.
 * @param {Object} producto - Datos del producto.
 * @param {HTMLElement} tarjeta - Elemento visual de la tarjeta.
 * @param {HTMLElement} boton - El botón que dispara la acción.
 * @param {MouseEvent} evento - Evento del clic para la animación.
 */
function gestionarCompra(producto, tarjeta, boton, evento) {
    const jugador = window.jugadorLogueado;
    const slots = document.querySelectorAll('.slot');

    const indice = jugador.inventario.findIndex(item => item.id === producto.id);

    if(indice === -1){
        if (jugador.dinero < producto.precio){
            alert("No tienes suficiente dinero");
            return;
        }

        if (jugador.inventario.length >= 6){
            alert("Inventario lleno");
            return;
        }

        // si se compra se dispara la animacion
        animarIconoCompra(evento);

        jugador.dinero -= producto.precio;
        jugador.inventario.push(producto);

        tarjeta.classList.add('tarjeta-comprada');
        boton.textContent = "Eliminar";
        boton.style.backgroundColor = "red";

        for (let slot of slots){
            if (slot.innerHTML === ""){
                slot.innerHTML = `<img src="${producto.imagen}" id="img-slot-${producto.id}" style="width:100%; height:100%; object-fit:contain;">`;
                break;
            }
        }
    } else {
        jugador.dinero += producto.precio;
        jugador.inventario.splice(indice, 1);
        
        tarjeta.classList.remove('tarjeta-comprada');
        boton.textContent = "Añadir";
        boton.style.backgroundColor = "";

        const imagenRemove = document.getElementById(`img-slot-${producto.id}`);
        if (imagenRemove){
            imagenRemove.parentElement.innerHTML = "";
        }
    }

    const displayDinero = document.getElementById('dinero-display');
    if (displayDinero) {
        displayDinero.textContent = jugador.dinero + "";
    }
}

/**
 * @function botonConfirmar
 * @description Configura el botón de confirmar compra para aplicar bonus y cambiar de escena.
 */
export function botonConfirmar (){
    const btnConfirmar = document.getElementById('btn-comprar-todo');
    if(!btnConfirmar) return;

    btnConfirmar.addEventListener('click', () =>{
        const jugador = window.jugadorLogueado;

        jugador.inventario.forEach(objeto => {
            if (objeto.tipo === "Arma") {
                jugador.atq += objeto.bonus;
            } else if (objeto.tipo === "Armadura") {
                jugador.def += objeto.bonus;
            } else if (objeto.tipo === "Consumible") {
                jugador.vida += objeto.bonus;
            }
        });

        document.getElementById('escena-2').classList.add('oculto');
        document.getElementById('escena-3').classList.remove('oculto');

        mostrarPerfil();
    });
}