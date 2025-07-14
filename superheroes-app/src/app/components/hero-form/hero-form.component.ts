import { Component, signal, computed, effect } from '@angular/core';
import { SuperheroesService } from '../../services/superheroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHeroe } from '../../models/superheroe.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UppercaseDirective } from '../../directives/uppercase.directive';
@Component({
  selector: 'app-hero-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    UppercaseDirective
  ],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent {
  nombre = signal('');
  poder = signal('');
  descripcion = signal('');
  editMode = signal(false);
  heroId?: number;

  nombreError = computed(() => {
    const value = this.nombre();
    if (!value) return 'El nombre es obligatorio';
    if (value.length < 3) return 'Mínimo 3 caracteres';
    return '';
  });
  poderError = computed(() => !this.poder() ? 'El poder es obligatorio' : '');
  formInvalid = computed(() => !!this.nombreError() || !!this.poderError());
  loading = computed(() => this.loadingService.loading());
  constructor(
    private heroesService: SuperheroesService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode.set(true);
        this.heroId = +id;
        const hero = this.heroesService.getHeroeById(this.heroId)();
        if (hero) {
          this.nombre.set(hero.nombre);
          this.poder.set(hero.poder);
          this.descripcion.set(hero.descripcion ?? '');
        }
      }
    });
  }

  onSubmit() {
    if (this.formInvalid()) return;
    const hero: SuperHeroe = {
      id: this.heroId ?? 0,
      nombre: this.nombre(),
      poder: this.poder(),
      descripcion: this.descripcion()
    };
    if (this.editMode()) {
      this.loadingService.show()
      this.heroesService.actualizarHeroe(hero);
      setTimeout
        (() => {
          this.loadingService.hide();
          this.router.navigate(['/heroes']);
        }, 2000);
    } else {
      this.loadingService.show()
      this.heroesService.agregarHeroe({
        nombre: this.nombre(),
        poder: this.poder(),
        descripcion: this.descripcion()
      })
      setTimeout
        (() => {
          this.loadingService.hide();
          this.router.navigate(['/heroes']);
        }, 2000);
    }
  }

  cancelar() {
    this.router.navigate(['/heroes']);
  }

  onNombreInput(event: Event) {
    this.nombre.set((event.target as HTMLInputElement)?.value ?? '');
  }
  onPoderInput(event: Event) {
    this.poder.set((event.target as HTMLInputElement)?.value ?? '');
  }
  onDescripcionInput(event: Event) {
    this.descripcion.set((event.target as HTMLTextAreaElement)?.value ?? '');
  }
}
