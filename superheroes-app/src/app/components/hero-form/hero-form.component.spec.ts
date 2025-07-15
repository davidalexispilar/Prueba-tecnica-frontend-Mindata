import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { SuperheroesService } from '../../services/superheroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let heroesServiceSpy: jasmine.SpyObj<SuperheroesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: any;

  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('SuperheroesService', ['agregarHeroe', 'actualizarHeroe', 'getHeroeById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = { paramMap: of({ get: () => null }) };

    await TestBed.configureTestingModule({
      imports: [HeroFormComponent],
      providers: [
        { provide: SuperheroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería no permitir guardar si el formulario es inválido', () => {
    component.nombre.set('');
    component.poder.set('');
    component.descripcion.set('');
    component.onSubmit();
    expect(heroesServiceSpy.agregarHeroe).not.toHaveBeenCalled();
    expect(heroesServiceSpy.actualizarHeroe).not.toHaveBeenCalled();
  });

  it('debería agregar un héroe', () => {
    heroesServiceSpy.agregarHeroe.and.returnValue(undefined);
    component.nombre.set('Nuevo');
    component.poder.set('Fuerza');
    component.descripcion.set('');
    component.onSubmit();
    expect(heroesServiceSpy.agregarHeroe).toHaveBeenCalled();

  });

  it('debería actualizar un héroe', () => {
    component.editMode.set(true);
    component.heroId = 1;
    heroesServiceSpy.actualizarHeroe.and.returnValue(undefined);
    component.nombre.set('Editado');
    component.poder.set('Fuerza');
    component.descripcion.set('');
    component.onSubmit();
    expect(heroesServiceSpy.actualizarHeroe).toHaveBeenCalled();
    // Simular el setTimeout

  });

  it('debería no llamar a actualizar si no está en modo edición', () => {
    component.editMode.set(false);
    component.nombre.set('Test');
    component.poder.set('Poder');
    component.onSubmit();
    expect(heroesServiceSpy.actualizarHeroe).not.toHaveBeenCalled();
  });

  it('debería no guardar si el nombre está vacío', () => {
    component.nombre.set('');
    component.poder.set('Poder');
    component.onSubmit();
    expect(heroesServiceSpy.agregarHeroe).not.toHaveBeenCalled();
  });

  it('debería navegar al cancelar', () => {
    component.cancelar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes'], jasmine.any(Object));
  });
});
