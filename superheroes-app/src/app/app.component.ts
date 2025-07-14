import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'superheroes-app';
  loading = computed(() => this.loadingService.loading());
  constructor(private loadingService: LoadingService) { }
}
