import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SidebarItem {
  label: string;
  icon?: string;
  subItems?: SidebarItem[];
  href?: string;
  opacity?: number;
  level?: number;
}

@Injectable()
export class LayoutService {
  readonly SIDEBAR_ITEMS: SidebarItem[] = [
    {
      icon: 'sync_alt',
      label: $localize`Transactions`,
      subItems: [
        {
          label: $localize`Dossier`,
          href: '/dossier'
        },
        {
          label: $localize`Advance Justification`,
        },
        {
          label: $localize`Reconciling Items`,
        },
      ],
    },
    {
      icon: 'dialpad',
      label: $localize`Codes`,
      subItems: [
        {
          label: $localize`Advance code`,
          href: '/advance-code',
        },
        {
          label: $localize`Employee (T9)`,
          href: '/',
        },
      ],
    },
    {
      icon: 'clean_hands',
      label: $localize`Budget`,
      href: '/',
    },
    {
      icon: 'assignment',
      label: $localize`Reports`,
      subItems: [
        {
          label: $localize`Account Statements`,
          href: '/',
        },
        {
          label: $localize`Trackers`,
          // href: '/',
          // subItems: [
          //   {
          //     label: 'Payment Tracker',
          //     href: '/',
          //   },
          //   {
          //     label: 'Budget Tracker',
          //     href: '/',
          //   },
          //   {
          //     label: 'Advance Tracker',
          //     href: '/',
          //   },
          // ],
        },
      ],
    },
    {
      icon: 'dashboard',
      label: $localize`Dashboard`,
      href: '/dashboard',
    },
    // {
    //   label: 'Show more',
    //   opacity: 0.5,
    //   subItems: [
    //     {
    //       icon: 'person',
    //       label: 'Users',
    //       href: '/users',
    //       level: 0,
    //     },
    //   ],
    // },
  ];

  private _sidebarExpanded = new BehaviorSubject(true);

  get sidebarExpanded$() {
    return this._sidebarExpanded.asObservable();
  }

  get sidebarExpanded() {
    return this._sidebarExpanded.getValue();
  }

  toggleSidebar() {
    this._sidebarExpanded.next(!this._sidebarExpanded.getValue());
  }
}
