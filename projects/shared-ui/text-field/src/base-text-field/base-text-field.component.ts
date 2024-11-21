import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * BaseTextFieldComponent - A reusable text field component for Angular forms.
 * This component provides a basic text input field with customizable label,
 * placeholder, and type.
 *
 * ## Example Usage:
 * ```html
 * <aplz-ui-base-text-field
 *   label="Username"
 *   id="username"
 *   placeholder="Enter your username"
 *   [control]="formControl"
 * ></aplz-ui-base-text-field>
 * ```
 */
@Component({
  selector: 'aplz-ui-base-text-field',
  standalone: true, // Make it standalone for easy use in other components without NgModule declaration.
  templateUrl: './base-text-field.component.html',
  styleUrls: ['./base-text-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Improves performance by avoiding unnecessary change detection cycles.
  imports: [CommonModule, ReactiveFormsModule],
})
export class BaseTextFieldComponent {
  @Input() error: boolean = false;
  @Input() helperText: string = '';
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() control!: FormControl; // Control should be passed by the parent component

  // Additional methods or lifecycle hooks can be added here if needed in the future.

  get inputClass(): string {
    return this.control.invalid && this.control.touched
      ? 'base-text-field__input base-text-field__input--error'
      : 'base-text-field__input';
  }

  get labelClass(): string {
    return 'base-text-field__label';
  }

  get helperTextClass(): string {
    return 'base-text-field__helper-text';
  }
}
