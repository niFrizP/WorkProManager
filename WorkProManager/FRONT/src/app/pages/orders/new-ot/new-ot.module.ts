import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewOtComponent } from './new-ot.component';



@NgModule({
  declarations: [NewOtComponent],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule
  ]
})
export class NewOtModule { }
