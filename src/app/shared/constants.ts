import {
  DossierStatus,
  DossierStatusApproval,
  DossierStatusApprovalEnum,
  DossierStatusEnum,
} from '../types/dossier';

const ANIMATION_DEFAULT_TIME = 125;

export const DOSSIER_STATUS_APPROVALS: DossierStatusApproval[] = Object.keys(
  DossierStatusApprovalEnum
)
  .filter((key) => Number.isNaN(Number(key)))
  .map((key) => key as DossierStatusApproval);

export const DOSSIER_STATUSES: DossierStatus[] = Object.keys(DossierStatusEnum)
  .filter((key) => Number.isNaN(Number(key)))
  .map((key) => key as DossierStatus);

/**
 * Time in ms
 */
export const ANIMATION = {
  DEFAULT_TIME: ANIMATION_DEFAULT_TIME,
  SIDEBAR_EXPAND_TIME: 100,
  SIDEBAR_ITEM_EXPAND_TIME: ANIMATION_DEFAULT_TIME,
};
