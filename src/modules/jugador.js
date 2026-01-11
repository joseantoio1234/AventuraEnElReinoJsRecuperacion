export class Jugador{
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

