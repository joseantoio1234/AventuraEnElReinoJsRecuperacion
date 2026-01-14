export const PRODUCTOS_MERCADO = [
    { id: 1, nombre: "Hacha de Batalla", tipo: "Arma", bonus: 15 , precio: 50, rareza: "Comun", imagen: "img/hacha.png" },
    { id: 2, nombre: "Espada Runica", tipo: "Arma", bonus: 20, precio: 80, rareza: "Rara", imagen: "img/espada.png" },
    { id: 3, nombre: "Lanza Estratosferica", tipo: "Arma", bonus: 25, precio: 100, rareza: "Epica", imagen: "img/lanza.png" },
    { id: 4, nombre: "Dagas Mortales", tipo: "Arma", bonus: 30, precio: 150, rareza: "Legendaria", imagen: "img/dagas.png" },
    { id: 5, nombre: "Casco Redentor", tipo: "Armadura", bonus: 20, precio: 80,rareza: "Comun", imagen: "img/casco.png" },
    { id: 6, nombre: "Escudo Petrico", tipo: "Armadura", bonus: 40, precio: 130, rareza: "Rara", imagen: "img/escudo.png" },
    { id: 7, nombre: "Chaleco Polarizado", tipo: "Armadura", bonus: 50, precio: 150, rareza: "Epica", imagen: "img/chaleco.png" },
    { id: 8, nombre: "Pantalones Nevados", tipo: "Armadura", bonus: 60, precio: 180, rareza: "Legendaria", imagen: "img/pantalones.png" },
    { id: 9, nombre: "Manzana Dorada", tipo: "Consumible", bonus: 10, precio: 20, rareza: "Común", imagen: "img/manzana.png" },
    { id: 10, nombre: "Pera Justiciera", tipo: "Consumible", bonus: 20, precio: 40, rareza: "Rara", imagen: "img/pera.png" },
    { id: 11, nombre: "Platano Curandero", tipo: "Consumible", bonus: 30, precio: 60, rareza: "Rara", imagen: "img/platano.png" },,
    { id: 12, nombre: "Piña Anacomosus", tipo: "Consumible", bonus: 40, precio: 80, rareza: "Rara", imagen: "img/piña.png" },
];


import { Enemigo, Jefe } from './enemigo.js';

export const LISTA_ENEMIGOS = [
    new Enemigo("Bandido", "img/templario.png", 6, 50),
    new Enemigo("Lobo", "img/zorro.png", 9, 60),
    new Enemigo("Monster", "img/monst.png", 7, 40),
    new Enemigo("Orco", "img/orco.png", 12, 80),
    new Enemigo("Orangutan", "img/orangutan.png", 22,80 ),
    new Jefe("Dragón", "img/dragon.png", 28, 200) 
];
