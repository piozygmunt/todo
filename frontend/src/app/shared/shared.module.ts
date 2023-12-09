import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElipsisDirective } from './directives/elipsis.directive';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

const SNACK_BAR_CONFIG: MatSnackBarConfig = {
  duration: 3000,
  panelClass: 'snack-bar',
};

@NgModule({
  declarations: [ElipsisDirective],
  imports: [CommonModule, MatSnackBarModule],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: SNACK_BAR_CONFIG,
    },
  ],
  exports: [ElipsisDirective],
})
export class SharedModule {}
