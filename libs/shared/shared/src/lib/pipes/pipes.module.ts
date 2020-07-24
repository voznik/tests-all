import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundNumberPipe } from './round-number.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [RoundNumberPipe],
  exports: [RoundNumberPipe],
})
export class PipesModule {}
