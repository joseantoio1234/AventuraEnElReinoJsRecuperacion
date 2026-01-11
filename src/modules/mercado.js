import { mostrarPerfil } from '../script.js';
import { PRODUCTOS_MERCADO } from './constants.js';

export function pintarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    contenedor.innerHTML = "";

    PRODUCTOS_MERCADO.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';

        //tipo de producto
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
        boton.addEventListener('click', () => {
            gestionarCompra(producto, tarjeta, boton);
        });
    });
}

// inventario
function gestionarCompra(producto, tarjeta, boton) {
    const jugador = window.jugadorLogueado;
    const slots = document.querySelectorAll('.slot');

    //comprobar si ya esta en el inventario
    const indice = jugador.inventario.findIndex(item => item.id === producto.id);

    if(indice === -1){
        //añadir al inventario
        if (jugador.dinero < producto.precio){
            alert("No tienes suficiente dinero");
            return;
        }

        if (jugador.inventario.length >= 6){
            alert("Inventario lleno");
            return;
        }

        jugador.dinero -= producto.precio;
        jugador.inventario.push(producto);

        //cambia de color al seleccionarla
        tarjeta.classList.add('tarjeta-comprada');
        boton.textContent = "Eliminar";
        boton.style.backgroundColor = "red";

        //añadir producto al primer slot del inventario
        for (let slot of slots){
            if (slot.innerHTML === ""){
                slot.innerHTML = `<img src="${producto.imagen}" id="img-slot-${producto.id}" style="width:100%; height:100%; object-fit:contain;">`;
                break;
            }
        }
    } else {
        //retirar
        jugador.dinero += producto.precio;
        jugador.inventario.splice(indice, 1);
        
        //volver tarjeta producto a original
        tarjeta.classList.remove('tarjeta-comprada');
        boton.textContent = "Añadir";
        boton.style.backgroundColor = "";

        //quitar producto de inventario
        const imagenRemove = document.getElementById(`img-slot-${producto.id}`);
        if (imagenRemove){
            imagenRemove.parentElement.innerHTML = "";
        }

    }

    // actuañizar dinero
    const displayDinero = document.getElementById('dinero-display');
    if (displayDinero) {
        displayDinero.textContent = jugador.dinero + "";
    }
}

export function botonConfirmar (){
    const btnConfirmar = document.getElementById('btn-comprar-todo');

    btnConfirmar.addEventListener('click', () =>{
        const jugador = window.jugadorLogueado;

        // sumar bonus al personaje
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
