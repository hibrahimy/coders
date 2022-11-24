import {
  animate,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import {
  getFadeInOutParams,
  fadeInOutAni,
  slideInOutAni,
  getSlideInOutParams,
} from 'src/app/shared/animations';
import { SubsCollector } from 'src/app/shared/subs-collector';

import { LayoutService, SidebarItem } from '../../layout.service';

@Component({
  selector: 'bfr-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  animations: [
    trigger('childItemsTrigger', [
      transition(':enter', [
        animate('0ms', style({ opacity: 0 })),
        useAnimation(slideInOutAni, {
          params: getSlideInOutParams({
            direction: 'vertical',
            state: 'expand',
          }),
        }),
        useAnimation(fadeInOutAni, {
          params: getFadeInOutParams({
            direction: 'in',
          }),
        }),
      ]),
      transition(':leave', [
        useAnimation(fadeInOutAni, {
          params: getFadeInOutParams({
            direction: 'out',
          }),
        }),
        useAnimation(slideInOutAni, {
          params: getSlideInOutParams({
            direction: 'vertical',
            state: 'collapse',
          }),
        }),
      ]),
    ]),
    trigger('labelTrigger', [
      transition(':enter', [
        animate('0ms', style({ opacity: 0 })),
        useAnimation(slideInOutAni, {
          params: getSlideInOutParams({
            direction: 'horizontal',
            state: 'expand',
          }),
        }),
        useAnimation(fadeInOutAni, {
          params: getFadeInOutParams({
            direction: 'in',
          }),
        }),
      ]),
      transition(':leave', [
        useAnimation(fadeInOutAni, {
          params: getFadeInOutParams({
            direction: 'out',
          }),
        }),
        useAnimation(slideInOutAni, {
          params: getSlideInOutParams({
            direction: 'horizontal',
            state: 'collapse',
          }),
        }),
      ]),
    ]),
  ],
})
export class SidebarItemComponent extends SubsCollector implements OnInit {
  private _cachedExpanded = false;

  @Input() item: SidebarItem = {
    label: '',
  };
  @Input() level: number = 0;

  expanded$ = new BehaviorSubject(false);
  isOnItemRoute = false;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly router: Router
  ) {
    super();

    this.subs = this.layoutService.sidebarExpanded$.subscribe(
      (sidebarExpanded) => {
        if (sidebarExpanded) this.expanded$.next(this._cachedExpanded);
        else {
          this._cachedExpanded = this.expanded$.getValue();
          this.expanded$.next(false);
        }
      }
    );
  }

  ngOnInit() {
    this.checkOnItemRoute();

    this.subs = this.router.events
      .pipe(filter((evt) => evt instanceof NavigationEnd))
      .subscribe(() => this.checkOnItemRoute());
  }

  get expandable() {
    return Boolean(this.item.subItems?.length);
  }

  get sidebarExpanded$() {
    return this.layoutService.sidebarExpanded$;
  }

  get itemLevel() {
    return this.item.level ?? this.level;
  }

  checkOnItemRoute() {
    const itemHref = this.item.href ?? '/';

    this.isOnItemRoute =
      itemHref === '/'
        ? this.router.url === '/'
        : this.router.url.includes(itemHref);
  }

  onItemClick() {
    if (!this.layoutService.sidebarExpanded) this.layoutService.toggleSidebar();

    this.expanded$.next(!this.expanded$.getValue());
  }
}
