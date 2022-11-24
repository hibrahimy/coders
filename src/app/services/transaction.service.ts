import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diff } from 'deep-diff';
import { BehaviorSubject, iif, of, switchMap, tap } from 'rxjs';

import { Transaction } from '../types/transaction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor(private readonly http: HttpClient) {}

  get transactions$() {
    return this._transactions$.asObservable();
  }

  fetchTransactions(dossierId: string) {
    return this.http
      .get<Transaction[]>(
        environment.apiEndpoint + '/dossier/' + dossierId + '/transaction'
      )
      .pipe(tap((transactions) => this._transactions$.next(transactions)));
  }

  fetchTransaction(dossierId: string, transactionId: string) {
    return this.transactions$.pipe(
      switchMap((transactions) => {
        const transaction = transactions.find(({ id }) => id === transactionId);

        return iif(
          () => Boolean(transaction),
          of(transaction!),
          this.http.get<Transaction>(
            environment.apiEndpoint +
              '/dossier/' +
              dossierId +
              '/transaction/' +
              transactionId
          )
        );
      })
    );
  }

  addTransaction(dossierId: string, transaction: Transaction) {
    return this.http.post<Transaction>(
      environment.apiEndpoint + '/dossier/' + dossierId + '/transaction',
      transaction
    );
  }

  updateTransaction(
    dossierId: string,
    transactionId: string,
    deepDiff: Diff<Partial<Transaction>, Partial<Transaction>>[]
  ) {
    return this.http.patch(
      environment.apiEndpoint +
        '/dossier/' +
        dossierId +
        '/transaction/' +
        transactionId,
      deepDiff
    );
  }

  deleteTransaction(dossierId: string, transactionId: string) {
    return this.http.delete(
      environment.apiEndpoint +
        '/dossier/' +
        dossierId +
        '/transaction/' +
        transactionId
    );
  }
}
