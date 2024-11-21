import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { CommonModule, NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BaseTextFieldComponent } from '../base-text-field/base-text-field.component';

/**
 * OutlinedTextFieldComponent - A specialized version of BaseTextFieldComponent
 * that provides an outlined style for the input field. This component extends
 * the base functionality of BaseTextFieldComponent while maintaining consistent
 * API and behavior.
 *
 * ## Example Usage:
 * ```html
 * <aplz-ui-outlined-text-field
 *   label="Email"
 *   id="email"
 *   placeholder="Enter your email"
 *   [control]="emailFormControl"
 * ></aplz-ui-outlined-text-field>
 * ```
 *
 * ## Description:
 * This component is built on top of BaseTextFieldComponent, inheriting all
 * of its inputs and behavior. It is designed to provide a visually distinct
 * "outlined" style for text input fields.
 */
@Component({
  standalone: true, // Make it standalone for easy use in other components without NgModule declaration.
  selector: 'aplz-ui-outlined-text-field',
  templateUrl: './outlined-text-field.component.html',
  styleUrls: ['./outlined-text-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Improves performance by avoiding unnecessary change detection cycles.
  imports: [CommonModule, NgClass, ReactiveFormsModule],
})
export class OutlinedTextFieldComponent extends BaseTextFieldComponent {
  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  isPasswordVisible = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get passwordToggleIcon(): string {
    const iconBase = this.isPasswordVisible ? 'eye-on-icon' : 'eye-off-icon';
    const errorSuffix =
      this.control.invalid && this.control.touched ? '-error' : '';
    return `/assets/icons/${iconBase}${errorSuffix}.svg`;
  }

  get passwordToggleAltText(): string {
    return this.isPasswordVisible ? 'Hide password' : 'Show password';
  }

  override get inputClass(): string {
    return this.control.invalid && this.control.touched
      ? 'outlined-text-field__input outlined-text-field__input--error'
      : 'outlined-text-field__input';
  }

  override get labelClass(): string {
    return this.control.invalid && this.control.touched
      ? 'outlined-text-field__label outlined-text-field__label--error'
      : 'outlined-text-field__label';
  }

  override get helperTextClass(): string {
    return this.control.invalid && this.control.touched
      ? 'outlined-text-field__helper-text outlined-text-field__helper-text--error'
      : 'outlined-text-field__helper-text';
  }
}
