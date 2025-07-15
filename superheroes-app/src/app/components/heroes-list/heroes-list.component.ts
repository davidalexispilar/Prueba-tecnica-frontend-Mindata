import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperheroesService } from '../../services/superheroes.service';
import { SuperHeroe } from '../../models/superheroe.model';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { signal, computed } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButton,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'poder', 'acciones'];
  filter = signal('');
  pageIndex = signal(0);
  pageSize = signal(5);

  filteredHeroes = computed(() =>
    this.heroesService.getHeroes()
      .filter((hero: SuperHeroe) =>
        hero.nombre.toLowerCase().includes(this.filter().toLowerCase())
      )
  );

  pagedHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredHeroes().slice(start, start + this.pageSize());
  });


  totalFiltered = computed(() => this.filteredHeroes().length);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading = computed(() => this.loadingService.loading());
  constructor(
    private heroesService: SuperheroesService,
    private router: Router,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe(params => {
      const filtroURL = params.get('filtro') || '';
      this.filter.set(filtroURL);
    });
  }

  ngOnInit(): void {

  }
  updateFilter(filterValue: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filtro: filterValue },
      queryParamsHandling: 'merge',
    });
  }

  onFilterInput(value: string) {
    this.filter.set(value);
    this.pageIndex.set(0);
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement)?.value ?? '';
    this.onFilterInput(value);
  }

  onPageChange(event: any) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  addHero() {
    this.router.navigate(['/heroes/nuevo']);
  }

  editHero(id: number) {
    this.router.navigate(['/heroes/editar', id], {
      queryParamsHandling: 'preserve'
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: '¿Estás seguro de que deseas borrar este héroe?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadingService.show();
      if (result) {
        setTimeout(() => {
          this.loadingService.hide();
          this.heroesService.eliminarHeroe(id);
        }, 2000);

      } else {
        this.loadingService.hide();
      }
    });
  }
}
