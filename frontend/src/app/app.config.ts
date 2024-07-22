import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Cloudinary } from '@cloudinary/url-gen';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { taskReducer } from './store/reducers/task.reducer';
import { TaskEffects } from './store/effects/task.effects';
import { TaskService } from './task.service';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const cloudinaryInstance = new Cloudinary({
  cloud: { cloudName: 'dalvenjha' },
  url: { secure: true }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: Cloudinary, useValue: cloudinaryInstance },
    importProvidersFrom(
      MatDialogModule,
      MatButtonModule,
      MatSelectModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatListModule,
      MatPaginatorModule,
      MatProgressSpinnerModule
    ),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    provideStore({ tasks: taskReducer }),
    provideEffects(TaskEffects),
    TaskService,
    importProvidersFrom(EffectsModule.forRoot([TaskEffects])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};