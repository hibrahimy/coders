import { Component, Input } from '@angular/core';
import { FooterItem } from 'src/app/services/footer.service';

@Component({
  selector: 'bfr-footer-item',
  templateUrl: './footer-item.component.html',
})
export class FooterItemComponent {
  @Input() item: FooterItem = {
    label: '',
    content: '',
    maxWidth: 'unset',
    fontSize: 14,
    color: '',
  };

  get maxWidth() {
    return this.item.maxWidth ?? 'unset';
  }

  get fontSize() {
    return this.item.fontSize ?? 14;
  }

  get color() {
    return this.item.color ?? 'black';
  }
}
