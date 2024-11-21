import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { AplazoLowercaseDirective } from './lower-case-text.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input [formControl]="control" aplazoLowercase />`,
})
class TestComponent {
  control = new FormControl('');
}

describe('AplazoLowercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;
  let formControl: FormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ReactiveFormsModule, FormsModule, AplazoLowercaseDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    formControl = fixture.componentInstance.control;
  });

  it('should create an instance of the directive', () => {
    const directive = fixture.debugElement
      .query(By.directive(AplazoLowercaseDirective))
      .injector.get(AplazoLowercaseDirective);

    expect(directive).toBeTruthy();
  });

  it('should convert input value to lowercase on input event', () => {
    inputElement.value = 'HELLO WORLD';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('hello world');
    expect(formControl.value).toBe('hello world');
  });

  it('should preserve the cursor position after converting to lowercase', () => {
    inputElement.value = 'HeLLo WoRLd';
    inputElement.setSelectionRange(5, 5); // Set cursor position at index 5
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Expect the cursor to be preserved after conversion
    expect(inputElement.selectionStart).toBe(5);
  });

  it('should update the form control value when input value changes', () => {
    formControl.setValue('TeST InPut');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(formControl.value).toBe('test input');
    expect(inputElement.value).toBe('test input');
  });

  it('should not throw an error when NgControl is not present', () => {
    const directive = fixture.debugElement
      .query(By.directive(AplazoLowercaseDirective))
      .injector.get(AplazoLowercaseDirective);

    expect(() => directive.sanitizeValue(new Event('input'))).not.toThrow();
  });
});
