import { MxCurrencyPipe } from './mx-currency.pipe';
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';

registerLocaleData(localeEsMX);

describe('MxCurrencyPipe', () => {
  const pipe = new MxCurrencyPipe();

  it('should format a number as MXN with default decimals', () => {
    const result = pipe.transform(1234.56);
    expect(result).toBe('$1,234.56');
  });

  it('should format a number without decimals when digitsInfo is "1.0-0"', () => {
    const result = pipe.transform(1234.56, '1.0-0');
    expect(result).toBe('$1,235');
  });

  it('should return null for null values', () => {
    const result = pipe.transform(null);
    expect(result).toBeNull();
  });

  it('should return null for undefined values', () => {
    const result = pipe.transform(undefined);
    expect(result).toBeNull();
  });

  it('should format a large number correctly', () => {
    const result = pipe.transform(123456789.1234);
    expect(result).toBe('$123,456,789.12');
  });

  it('should handle negative values correctly', () => {
    const result = pipe.transform(-9876.543);
    expect(result).toBe('-$9,876.54');
  });

  it('should respect a custom digit format (1.3-3)', () => {
    const result = pipe.transform(1234.56789, '1.3-3');
    expect(result).toBe('$1,234.568');
  });

  it('should format zero as $0.00', () => {
    const result = pipe.transform(0);
    expect(result).toBe('$0.00');
  });

  it('should format very small values correctly', () => {
    const result = pipe.transform(0.0001);
    expect(result).toBe('$0.00');
  });
});
