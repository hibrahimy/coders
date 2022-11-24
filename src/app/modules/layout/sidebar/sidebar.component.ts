import {
  animate,
  animateChild,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { map } from 'rxjs';

import { LayoutService } from '../layout.service';
import { ANIMATION } from 'src/app/shared/constants';

@Component({
  selector: 'bfr-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('sidebarTrigger', [
      state(
        'expanded',
        style({
          minWidth: 230,
        })
      ),
      state(
        'shrinked',
        style({
          minWidth: 0,
        })
      ),
      transition('expanded => shrinked', [
        query('@*', [animateChild()], { optional: true }),
        animate(`${ANIMATION.SIDEBAR_EXPAND_TIME}ms ease-in-out`),
      ]),
      transition('shrinked => expanded', [
        animate(`${ANIMATION.SIDEBAR_EXPAND_TIME}ms ease-in-out`),
        query('@*', [animateChild()], {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class SidebarComponent {
  constructor(private readonly layoutService: LayoutService) {}

  get sidebarItems() {
    return this.layoutService.SIDEBAR_ITEMS;
  }

  get state$() {
    return this.layoutService.sidebarExpanded$.pipe(
      map((expanded) => (expanded ? 'expanded' : 'shrinked'))
    );
  }

  get height() {
    return window.innerHeight - 80;
  }
}
