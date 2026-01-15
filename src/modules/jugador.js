/**
 * @file jugador.js
 * @description Define la clase Jugador con sus estadísticas, monedero e inventario.
 */

/**
 * @class Jugador
 * @description Representa al usuario, gestiona sus puntos y sus transacciones en el mercado.
 */
export class Jugador{
    /**
     * @constructor
     * @param {string} nombre - Nombre del vikingo.
     * @param {number} ataque - Puntos de ataque iniciales.
     * @param {number} defensa - Puntos de defensa iniciales.
     * @param {number} vida - Puntos de salud iniciales.
     * @param {string} imagen - Ruta de la imagen del personaje.
     */
    constructor(nombre, ataque, defensa, vida, imagen){
        this.nombre = nombre;
        this.atq = Number(ataque);
        this.def = Number(defensa);
        this.vida = Number(vida);
        this.imagen = imagen;
        this.dinero = 500;
        this.puntos = 0;
        this.inventario = [];   
    }

    /**
     * @function puedeComprar
     * @description Comprueba si el jugador tiene oro suficiente y espacio en la mochila.
     * @param {number} precio - Coste del objeto.
     * @returns {boolean} Verdadero si cumple ambos requisitos.
     */
    puedeComprar(precio){
        return this.dinero >= precio && this.inventario.length < 6;
    }

    /**
     * @function comprarObjeto
     * @description Añade un objeto al inventario y descuenta el dinero si es posible.
     * @param {Object} producto - El objeto a comprar.
     * @returns {boolean} Verdadero si la compra se realizó con éxito.
     */
    comprarObjeto(producto){
        if (this.puedeComprar(producto.precio)) {
            this.inventario.push(producto);
            this.dinero -= producto.precio;
            return true;
        }

        return false;
    }
}