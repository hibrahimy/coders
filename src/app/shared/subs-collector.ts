import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  template: ``,
})
export class SubsCollector implements OnDestroy {
  private _subscriptions: Subscription[] = [];

  set subs(sub: Subscription) {
    this._subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
