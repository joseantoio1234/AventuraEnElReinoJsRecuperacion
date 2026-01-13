export class Enemigo {
    constructor(nombre, imagen, ataque, vida) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.atq = ataque;
        this.vida = vida;
        this.puntosBase = 100;
    }

    // calcular los puntos al ser derrotado
    calcularPuntosRecompensa() {
        return this.puntosBase + this.atq;
    }
}

// subclase jefe
export class Jefe extends Enemigo {
    constructor(nombre, imagen, ataque, vida, multiplicador = 1.2) {
        super(nombre, imagen, ataque, vida);
        this.multiplicador = multiplicador;
    }

    // multiplicador del jefe
    calcularPuntosRecompensa() {
        const puntosNormales = super.calcularPuntosRecompensa();
        return Math.floor(puntosNormales * this.multiplicador);
    }
}
