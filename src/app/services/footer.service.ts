import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FooterItem {
  label: string;
  content: string;
  maxWidth?: string | number;
  fontSize?: number;
  color?: string;
}

export interface MenuItem {
  label: string;
  onClick: () => void;
  icon?: string;
  color?: string;
}

export interface FooterData {
  title: string;
  frontItems: FooterItem[];
  subItems: FooterItem[];
  onEdit?: () => void;
  menuItems?: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private _data$ = new BehaviorSubject<FooterData>({
    title: '',
    frontItems: [],
    subItems: [],
    menuItems: [],
  });
  private _expanded$ = new BehaviorSubject<boolean>(false);
  private _show$ = new BehaviorSubject<boolean>(false);

  get data() {
    return this._data$.asObservable();
  }

  get expanded$() {
    return this._expanded$.asObservable();
  }

  get show$() {
    return this._show$.asObservable();
  }

  setData(data: FooterData) {
    this._data$.next(data);
    this._expanded$.next(true);
    this._show$.next(true);
  }

  toggleExpand() {
    this._expanded$.next(!this._expanded$.getValue());
  }

  setShow(show: boolean) {
    this._show$.next(show);
    this._expanded$.next(false);
  }
}
