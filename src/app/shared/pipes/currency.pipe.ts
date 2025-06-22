import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'mtkCurrency',
})
export class mtkCurrencyPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: number | string): SafeHtml {
    const html = `<i class="mtk-icon-sar-currency"></i> &nbsp; <span>${value}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
