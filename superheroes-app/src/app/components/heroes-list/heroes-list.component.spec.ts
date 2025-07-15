import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesListComponent } from './heroes-list.component';
import { SuperheroesService } from '../../services/superheroes.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

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


    heroesServiceSpy.getHeroes.and.callFake(() => mockHeroes);

    heroesServiceSpy.eliminarHeroe.and.returnValue(undefined);
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

    await TestBed.configureTestingModule({
      imports: [HeroesListComponent],
      providers: [
        { provide: SuperheroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ActivatedRoute, useValue: { snapshot: {}, queryParamMap: of({ get: () => '' }) } }
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
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes/editar', 1], { queryParamsHandling: 'preserve' });
  });

  it('debería filtrar héroes por nombre', () => {
    component.onFilterInput('Super');
    expect(component.filteredHeroes().length).toBeGreaterThan(0);
  });

  it('debería cambiar la página correctamente', () => {
    component.onPageChange({ pageIndex: 1, pageSize: 1 });
    expect(component.pageIndex()).toBe(1);
    expect(component.pageSize()).toBe(1);
  });

  it('debería abrir y cerrar el diálogo de eliminación', () => {
    (dialogSpy.open as jasmine.Spy).and.returnValue({
      afterClosed: () => of(false)
    } as any);
    component.openDeleteDialog(1);

  });

});
