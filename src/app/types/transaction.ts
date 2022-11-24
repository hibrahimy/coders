import { AdvanceCode } from './advance-code';

export interface Transaction {
  id: string;
  transactionDate: string;
  transactionType: number;
  description: string;
  pvDate: string;
  balanceInGrantCurrency: number;
  balanceInLocalCurrency: number;
  budgetLine: number;
  employeeCode: AdvanceCode;
  advanceCode: AdvanceCode;
  paymentMethod: number;
  paymentDate: string;
  timestamp: string;
}
