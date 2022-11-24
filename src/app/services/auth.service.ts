import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<any>(true);

  get user$() {
    return this._user$.asObservable();
  }

  // Test functions
  setUser() {
    this._user$.next(true);
  }

  removeUser() {
    this._user$.next(false);
  }
  // ==============
}
