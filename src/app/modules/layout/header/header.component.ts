import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'bfr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly layoutService: LayoutService) {}

  get sidebarExpanded$() {
    return this.layoutService.sidebarExpanded$;
  }

  onToggleSidebar() {
    this.layoutService.toggleSidebar();
  }
}
