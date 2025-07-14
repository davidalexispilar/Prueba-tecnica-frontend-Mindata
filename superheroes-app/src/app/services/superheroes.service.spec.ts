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

  // it('debería obtener todos los héroes', done => {
  //   service.getHeroes().subscribe(heroes => {
  //     expect(heroes.length).toBeGreaterThan(0);
  //     done();
  //   });
  // });

  // it('debería agregar un héroe', done => {
  //   const nuevo: SuperHeroe = { id: 0, nombre: 'Nuevo', poder: 'Nuevo poder' };
  //   service.agregarHeroe(nuevo).subscribe(() => {
  //     service.getHeroes().subscribe(heroes => {
  //       expect(heroes.some(h => h.nombre === 'Nuevo')).toBeTrue();
  //       done();
  //     });
  //   });
  // });

  // it('debería actualizar un héroe', done => {
  //   service.getHeroes().subscribe(heroes => {
  //     const heroe = { ...heroes[0], nombre: 'Modificado' };
  //     service.actualizarHeroe(heroe).subscribe(() => {
  //       service.getHeroeById(heroe.id).subscribe(h => {
  //         expect(h?.nombre).toBe('Modificado');
  //         done();
  //       });
  //     });
  //   });
  // });

  // it('debería eliminar un héroe', done => {
  //   service.getHeroes().subscribe(heroes => {
  //     const id = heroes[0].id;
  //     service.eliminarHeroe(id).subscribe(() => {
  //       service.getHeroeById(id).subscribe(h => {
  //         expect(h).toBeUndefined();
  //         done();
  //       });
  //     });
  //   });
  // });

  // it('debería buscar héroes por nombre', done => {
  //   service.buscarHeroesPorNombre('man').subscribe(heroes => {
  //     expect(heroes.length).toBeGreaterThan(0);
  //     expect(heroes.some(h => h.nombre.toLowerCase().includes('man'))).toBeTrue();
  //     done();
  //   });
  // });
});
