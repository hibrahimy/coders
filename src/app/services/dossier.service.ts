import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diff } from 'deep-diff';
import { BehaviorSubject, iif, of, switchMap, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Dossier } from '../types/dossier';

@Injectable({
  providedIn: 'root',
})
export class DossierService {
  private _dossiers$ = new BehaviorSubject<Dossier[]>([]);

  constructor(private readonly http: HttpClient) {}

  get dossiers$() {
    return this._dossiers$.asObservable();
  }

  fetchDossiers() {
    return this.http
      .get<Dossier[]>(environment.apiEndpoint + '/dossier')
      .pipe(tap((dossiers) => this._dossiers$.next(dossiers)));
  }

  fetchDossier(dossierId: string) {
    return this.dossiers$.pipe(
      switchMap((dossiers) => {
        const dossier = dossiers.find(({ id }) => id === dossierId);

        return iif(
          () => Boolean(dossier),
          of(dossier!),
          this.http.get<Dossier>(
            environment.apiEndpoint + '/dossier/' + dossierId
          )
        );
      })
    );
  }

  addDossier(dossier: Dossier) {
    return this.http.post<Dossier>(
      environment.apiEndpoint + '/dossier',
      dossier
    );
  }

  updateDossier(
    dossierId: string,
    deepDiff: Diff<Partial<Dossier>, Partial<Dossier>>[]
  ) {
    return this.http.patch(
      environment.apiEndpoint + '/dossier/' + dossierId,
      deepDiff
    );
  }

  deleteDossier(dossierId: string) {
    return this.http.delete(environment.apiEndpoint + '/dossier/' + dossierId);
  }
}
