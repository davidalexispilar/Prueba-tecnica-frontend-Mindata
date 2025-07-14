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
    component.heroForm.setValue({ nombre: '', poder: '', descripcion: '' });
    component.onSubmit();
    expect(heroesServiceSpy.agregarHeroe).not.toHaveBeenCalled();
    expect(heroesServiceSpy.actualizarHeroe).not.toHaveBeenCalled();
  });

  it('debería agregar un héroe y navegar', () => {
    heroesServiceSpy.agregarHeroe.and.returnValue(of());
    component.heroForm.setValue({ nombre: 'Nuevo', poder: 'Fuerza', descripcion: '' });
    component.onSubmit();
    expect(heroesServiceSpy.agregarHeroe).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('debería actualizar un héroe y navegar', () => {
    component.editMode = true;
    component.heroId = 1;
    heroesServiceSpy.actualizarHeroe.and.returnValue(of());
    component.heroForm.setValue({ nombre: 'Editado', poder: 'Fuerza', descripcion: '' });
    component.onSubmit();
    expect(heroesServiceSpy.actualizarHeroe).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('debería navegar al cancelar', () => {
    component.cancelar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes']);
  });
});
