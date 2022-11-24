import { filter, Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export class CustomDataSource<T> extends MatTableDataSource<T> {
  private _filterSubscription$: Subscription;
  private _dataSubscription$: Subscription;

  constructor(
    dataStream: Observable<T[]>,
    filterStream: Observable<string | null>
  ) {
    super([]);

    this._dataSubscription$ = dataStream.subscribe(
      (data) => (this.data = [...data])
    );
    this._filterSubscription$ = filterStream
      .pipe(filter((value) => typeof value === 'string'))
      .subscribe((value) => {
        this.filter = (value ?? '').trim().toLowerCase();

        if (this.paginator) {
          this.paginator.firstPage();
        }
      });
  }

  override disconnect(): void {
    this._filterSubscription$.unsubscribe();
    this._dataSubscription$.unsubscribe();
  }
}
