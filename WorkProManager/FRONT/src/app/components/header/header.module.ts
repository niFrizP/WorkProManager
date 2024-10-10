import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, HeaderComponent],
  providers: [TitleCasePipe],
  exports: [HeaderComponent],
})
export class HeaderModule {}
