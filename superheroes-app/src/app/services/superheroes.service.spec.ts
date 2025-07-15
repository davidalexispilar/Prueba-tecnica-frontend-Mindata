import { TestBed } from '@angular/core/testing';
import { SuperheroesService } from './superheroes.service';
import { SuperHeroe } from '../models/superheroe.model';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperheroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener todos los héroes', () => {
    const heroes = service.getHeroes();
    expect(heroes.length).toBeGreaterThan(0);
  });

  it('debería agregar un héroe', () => {
    const nuevo: SuperHeroe = { id: 0, nombre: 'Nuevo', poder: 'Nuevo poder' };
    service.agregarHeroe(nuevo);
    const heroes = service.getHeroes();
    expect(heroes.some(h => h.nombre === 'Nuevo')).toBeTrue();
  });

  it('debería actualizar un héroe', () => {
    const heroes = service.getHeroes();
    const heroe = { ...heroes[0], nombre: 'Modificado' };
    service.actualizarHeroe(heroe);
    const actualizado = service.getHeroeById(heroe.id)();
    expect(actualizado?.nombre).toBe('Modificado');
  });

  it('debería eliminar un héroe', () => {
    const heroes = service.getHeroes();
    const id = heroes[0].id;
    service.eliminarHeroe(id);
    const eliminado = service.getHeroeById(id)();
    expect(eliminado).toBeUndefined();
  });

  it('debería buscar héroes por nombre', () => {
    const resultado = service.buscarHeroesPorNombre('man')();
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.some(h => h.nombre.toLowerCase().includes('man'))).toBeTrue();
  });
});
