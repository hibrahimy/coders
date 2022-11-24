import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bfr-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private readonly authService: AuthService) {}

  get user$() {
    return this.authService.user$;
  }
}
