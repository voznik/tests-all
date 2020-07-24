import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from './pipes/pipes.module';

const SHARED_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  PipesModule,
];

@NgModule({
  imports: SHARED_MODULES,
  exports: SHARED_MODULES,
})
export class SharedModule {}
