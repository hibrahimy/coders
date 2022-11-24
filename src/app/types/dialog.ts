import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';

export interface DialogProps {
  title?: string;
  content: string;
  errorMessage?: string;
  confirmColor?: ThemePalette;
  confirmLabel?: string;
  confirmObservable?: () => Observable<any>;
  cancelLabel?: string;
}
