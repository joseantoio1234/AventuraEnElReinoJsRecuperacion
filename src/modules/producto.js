/**
 * @file producto.js
 * @description Define la clase Producto para los objetos disponibles en el mercado.
 */

/**
 * @class Producto
 * @description Representa un objeto de equipo (Arma, Armadura o Consumible) que el jugador puede comprar.
 */
export class Producto{
    /**
     * @constructor
     * @param {number} id - Identificador único del producto.
     * @param {string} nombre - Nombre del objeto.
     * @param {string} tipo - Categoría del objeto (Arma, Armadura, Consumible).
     * @param {number} bonus - Puntos de estadística que suma al jugador.
     * @param {number} precio - Coste en monedas de oro.
     * @param {string} rareza - Calidad del objeto (Común, Raro, Épico).
     * @param {string} imagen - Ruta del archivo de imagen.
     */
    constructor(id, nombre, tipo, bonus, precio, rareza, imagen){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.bonus = bonus;
        this.precio = precio;
        this.rareza = rareza;
        this.imagen = imagen;
    }
}