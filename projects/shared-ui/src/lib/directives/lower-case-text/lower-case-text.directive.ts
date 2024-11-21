/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, inject, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[aplazoLowercase]',
  host: {
    '(input)': 'sanitizeValue()',
  },
})
export class AplazoLowercaseDirective {
  readonly #ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    this.sanitizeValue(event);
  }

  sanitizeValue(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement) {
      const newValue = inputElement.value.toLowerCase();
      const cursorPosition = inputElement.selectionStart ?? 0;

      inputElement.value = newValue;

      if (this.#ngControl?.control) {
        this.#ngControl.control.setValue(newValue);
        this.#ngControl.control.updateValueAndValidity();
      }

      inputElement.value = newValue;

      inputElement.setSelectionRange(cursorPosition, cursorPosition);
    }
  }
}
