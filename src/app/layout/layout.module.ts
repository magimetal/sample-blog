import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PageComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [PageComponent, HeaderComponent, SidebarComponent, FooterComponent],
})
export class LayoutModule {}
