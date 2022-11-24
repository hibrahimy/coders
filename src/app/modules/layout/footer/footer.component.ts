import {
  animateChild,
  query,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';
import { getSlideInOutParams, slideInOutAni } from 'src/app/shared/animations';

@Component({
  selector: 'bfr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('footerTrigger', [
      transition(':enter', [
        useAnimation(slideInOutAni, {
          params: getSlideInOutParams({
            direction: 'vertical',
            state: 'expand',
          }),
        }),
      ]),
      transition(':leave', [
        useAnimation(slideInOutAni, {
          params: getSlideInOutParams({
            direction: 'vertical',
            state: 'collapse',
          }),
        }),
      ]),
    ]),
  ],
})
export class FooterComponent {
  constructor(private readonly footerService: FooterService) {}

  get data() {
    return this.footerService.data;
  }

  get expanded$() {
    return this.footerService.expanded$;
  }

  get show$() {
    return this.footerService.show$;
  }

  onToggleExpand() {
    this.footerService.toggleExpand();
  }
}
