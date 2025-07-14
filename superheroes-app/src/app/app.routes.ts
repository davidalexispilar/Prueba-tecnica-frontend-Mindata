import { Routes } from '@angular/router';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesListComponent },
  { path: 'heroes/nuevo', component: HeroFormComponent },
  { path: 'heroes/editar/:id', component: HeroFormComponent },
  { path: '**', redirectTo: 'heroes' }
];
