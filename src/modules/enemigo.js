/**
 * @file enemigo.js
 * @description Define las clases para los oponentes del juego, incluyendo la lógica de recompensas.
 */

/**
 * @class Enemigo
 * @description Representa a un enemigo estándar con estadísticas de combate.
 */
export class Enemigo {
    /**
     * @constructor
     * @param {string} nombre - Nombre del enemigo.
     * @param {string} imagen - Ruta de la imagen del enemigo.
     * @param {number} ataque - Puntos de daño que inflige.
     * @param {number} vida - Puntos de salud del enemigo.
     */
    constructor(nombre, imagen, ataque, vida) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.atq = ataque;
        this.vida = vida;
        this.puntosBase = 100;
    }

    /**
     * @function calcularPuntosRecompensa
     * @description Calcula los puntos que recibe el jugador al vencerlo.
     * @returns {number} Suma de puntos base y ataque.
     */
    // calcular los puntos al ser derrotado
    calcularPuntosRecompensa() {
        return this.puntosBase + this.atq;
    }
}

/**
 * @class Jefe
 * @extends Enemigo
 * @description Variante de enemigo más fuerte con un multiplicador de puntuación.
 */
// subclase jefe
export class Jefe extends Enemigo {
    /**
     * @constructor
     * @param {string} nombre - Nombre del jefe.
     * @param {string} imagen - Ruta de la imagen del jefe.
     * @param {number} ataque - Puntos de daño.
     * @param {number} vida - Puntos de salud.
     * @param {number} [multiplicador=1.2] - Factor por el que se multiplica la recompensa.
     */
    constructor(nombre, imagen, ataque, vida, multiplicador = 1.2) {
        super(nombre, imagen, ataque, vida);
        this.multiplicador = multiplicador;
    }

    /**
     * @function calcularPuntosRecompensa
     * @description Calcula la recompensa aplicando el multiplicador especial de jefe.
     * @returns {number} Puntos finales redondeados hacia abajo.
     */
    // multiplicador del jefe
    calcularPuntosRecompensa() {
        const puntosNormales = super.calcularPuntosRecompensa();
        return Math.floor(puntosNormales * this.multiplicador);
    }
}