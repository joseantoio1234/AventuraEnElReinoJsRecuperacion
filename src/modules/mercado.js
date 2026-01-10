import { PRODUCTOS_MERCADO } from './constants.js';

export function pintarProductos(){
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    contenedor.innerHTML = "";

    PRODUCTOS_MERCADO.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';

        tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="rareza">${producto.rareza}</p>
        <p class="bonus" style="color: yellow;">Bonus: +${producto.bonus}</p>
        <p class="precio"><strong>${producto.precio}</strong>€</p>
        <button class="btn-add" data-id="${producto.id}">Añadir</button>
        `;

        contenedor.appendChild(tarjeta);
    });
}