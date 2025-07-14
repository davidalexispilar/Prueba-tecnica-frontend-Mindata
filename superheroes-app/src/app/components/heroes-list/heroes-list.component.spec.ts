import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesListComponent } from './heroes-list.component';
import { SuperheroesService } from '../../services/superheroes.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { signal } from '@angular/core';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let heroesServiceSpy: jasmine.SpyObj<SuperheroesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const mockHeroes = [
    { id: 1, nombre: 'Superman', poder: 'Vuelo' },
    { id: 2, nombre: 'Spiderman', poder: 'Trepar muros' }
  ];

  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('SuperheroesService', ['getHeroes', 'buscarHeroesPorNombre', 'eliminarHeroe']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    heroesServiceSpy.getHeroes.and.returnValue(mockHeroes);

    heroesServiceSpy.eliminarHeroe.and.returnValue(undefined);
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

    await TestBed.configureTestingModule({
      imports: [HeroesListComponent],
      providers: [
        { provide: SuperheroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debería navegar al añadir héroe', () => {
    component.addHero();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes/nuevo']);
  });

  it('debería navegar al editar héroe', () => {
    component.editHero(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes/editar', 1]);
  });


});
