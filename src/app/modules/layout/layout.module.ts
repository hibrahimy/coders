import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

import { LayoutService } from './layout.service';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { FooterItemComponent } from './footer/footer-item/footer-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    SidebarComponent,
    SidebarItemComponent,
    FooterComponent,
    FooterItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // Material
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatMenuModule,
  ],
  exports: [LayoutComponent],
  providers: [LayoutService],
})
export class LayoutModule {}
