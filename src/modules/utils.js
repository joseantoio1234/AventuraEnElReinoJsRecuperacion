/**
 * @file utils.js
 * @description Funciones de apoyo para validar los datos de entrada del usuario.
 */

/**
 * @function validarNombre
 * @description Verifica que el nombre empiece por mayúscula y no supere los 20 caracteres.
 * @param {string} nombre - El texto introducido por el usuario.
 * @returns {boolean} Verdadero si cumple con la expresión regular y no está vacío.
 */
//regex
export const validarNombre = (nombre) => {

    const regla = /^[A-Z][a-zA-Z\s]{0,19}$/;

    if (regla.test(nombre) && nombre.trim().length > 0){
        return true;
    } else {
        return false;
    }
};

/**
 * @function validarPuntos
 * @description Comprueba que la suma de estadísticas no exceda 110 y que la vida mínima sea 100.
 * @param {number|string} atq - Puntos de ataque.
 * @param {number|string} def - Puntos de defensa.
 * @param {number|string} vida - Puntos de vida.
 * @returns {boolean} Verdadero si la suma y los mínimos son correctos.
 */
export const validarPuntos = (atq, def, vida) => {
    const total = Number(atq) + Number(def) + Number(vida);

    if (total <= 110 && atq >= 0 && def >= 0 && vida >= 100){
        return true;
    } else {
        return false;
    }
}