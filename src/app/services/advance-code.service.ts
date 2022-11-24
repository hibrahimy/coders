import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Diff } from 'deep-diff';

import { environment } from 'src/environments/environment';
import { AdvanceCode } from '../types/advance-code';
@Injectable({
  providedIn: 'root',
})
export class AdvanceCodeService {
  private _advanceCodes$ = new BehaviorSubject<AdvanceCode[]>([]);

  constructor(private readonly http: HttpClient) {}

  get advanceCodes$() {
    return this._advanceCodes$.asObservable();
  }

  fetchAdvanceCodes() {
    return this.http
      .get<AdvanceCode[]>(environment.apiEndpoint + '/tcode')
      .pipe(tap((advanceCodes) => this._advanceCodes$.next(advanceCodes)));
  }

  fetchAdvanceCode(avanceCodeId: string) {
    return this._advanceCodes$.pipe(
      switchMap((advanceCodes) => {
        const advanceCode = advanceCodes.find(({ id }) => id === avanceCodeId);

        return iif(
          () => Boolean(advanceCode),
          of(advanceCode!),
          this.http.get<AdvanceCode>(
            environment.apiEndpoint + '/tcode/' + avanceCodeId
          )
        );
      })
    );
  }

  deleteAdvanceCode(id: string) {
    return this.http.delete(environment.apiEndpoint + '/tcode/' + id);
  }

  updateAdvanceCode(
    id: string,
    deepDiff: Diff<Partial<AdvanceCode>, Partial<AdvanceCode>>[]
  ) {
    return this.http.patch(environment.apiEndpoint + '/tcode/' + id, deepDiff);
  }

  addAdvanceCode(advanceCode: AdvanceCode) {
    return this.http.post<AdvanceCode>(
      environment.apiEndpoint + '/tcode',
      advanceCode
    );
  }
}
