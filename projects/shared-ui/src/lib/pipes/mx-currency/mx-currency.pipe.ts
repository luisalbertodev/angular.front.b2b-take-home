import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';

@Pipe({
  name: 'mxCurrency',
  standalone: true,
})
export class MxCurrencyPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    digitsInfo: string = '1.2-2'
  ): string | null {
    if (value == null) {
      return null;
    }

    return formatCurrency(value, 'es-MX', '$', 'MXN', digitsInfo);
  }
}
