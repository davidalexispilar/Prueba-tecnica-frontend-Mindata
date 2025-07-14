import { Injectable, signal, computed } from '@angular/core';
import { SuperHeroe } from '../models/superheroe.model';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {
  private heroes = signal<SuperHeroe[]>([
    { id: 1, nombre: 'Superman', poder: 'Vuelo', descripcion: 'El hombre de acero' },
    { id: 2, nombre: 'Spiderman', poder: 'Trepar muros', descripcion: 'El hombre araña' },
    { id: 3, nombre: 'el fuerte', poder: 'Super fuerza' }
  ]);

  getHeroes() { return this.heroes(); }

  getHeroeById = (id: number) => computed(() => this.heroes().find(h => h.id === id));

  buscarHeroesPorNombre = (nombre: string) => computed(() =>
    this.heroes().filter(h => h.nombre.toLowerCase().includes(nombre.toLowerCase()))
  );

  agregarHeroe(heroe: Omit<SuperHeroe, 'id'>) {
    const newHero = { ...heroe, id: this.generarId() };
    this.heroes.update(heroes => [...heroes, newHero]);
  }

  actualizarHeroe(heroe: SuperHeroe) {
    this.heroes.update(heroes => heroes.map(h => h.id === heroe.id ? heroe : h));
  }

  eliminarHeroe(id: number) {
    this.heroes.update(heroes => heroes.filter(h => h.id !== id));
  }

  private generarId(): number {
    return this.heroes().length > 0 ? Math.max(...this.heroes().map(h => h.id)) + 1 : 1;
  }
}
