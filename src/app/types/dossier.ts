export interface Dossier {
  id: string;
  timestamp: string;
  entryDate: string;
  requestNumber: number;
  receivedDate: string;
  transactionReference: string;
  description: string;
  amountInGrantCurrency: number;
  amountInLocalCurrency: number;
  status: number;
  statusApproval: number;
  statusApprovalReason: string;
  statusApprovedDelay: boolean;
  lastStatusUpdate: string;
  deleted: false;
}

export type DossierStatus = 'Closed' | 'Open';

export enum DossierStatusEnum {
  'Closed',
  'Open',
}

export type DossierStatusApproval =
  | 'Received'
  | 'Return'
  | 'Approved'
  | 'Second Approval'
  | 'Rejected';

export enum DossierStatusApprovalEnum {
  'Received',
  'Return',
  'Approved',
  'Second Approval',
  'Rejected',
}
