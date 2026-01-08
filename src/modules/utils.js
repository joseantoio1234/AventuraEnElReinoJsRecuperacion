export const validarNombre = (nombre) => {

    const regla = /^[A-Z][a-zA-Z\s]{0,19}$/;

    if (regla.test(nombre) && nombre.trim().length > 0){
        return true;
    } else {
        return false;
    }
};

export const validarPuntos = (atq, def, vida) => {
    const total = Number(atq) + Number(def) + Number(vida);

    if (total <= 110 && atq >= 0 && def >= 0 && vida >= 100){
        return true;
    } else {
        return false;
    }
}