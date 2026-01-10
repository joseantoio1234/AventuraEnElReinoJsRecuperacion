export class Jugador{
    constructor(nombre, ataque, defensa, vida){
        this.nombre = nombre;
        this.ataqueBase = Number(ataque);
        this.defensaBase = Number(defensa);
        this.vidaBase = Number(vida);
        this.dinero = 500;
        this.puntos = 0;
        this.inventario = [];   
    }

    puedeComprar(precio){
        return this.dinero >= precio && this.inventario.length < 6;
    }

    comprarObjeto(producto){
        if (this.puedeComprar(producto.precio)) {
            this.inventario.push(producto);
            this.dinero -= producto.precio;
            return true;
        }

        return false;
    }
}

