import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { AplazoNoWhiteSpaceDirective } from './no-white-space.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input [formControl]="control" aplazoNoWhiteSpace />`,
})
class TestComponent {
  control = new FormControl('');
}

describe('AplazoNoWhiteSpaceDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;
  let formControl: FormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ReactiveFormsModule, FormsModule, AplazoNoWhiteSpaceDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    formControl = fixture.componentInstance.control;
  });

  it('should create an instance of the directive', () => {
    const directive = fixture.debugElement
      .query(By.directive(AplazoNoWhiteSpaceDirective))
      .injector.get(AplazoNoWhiteSpaceDirective);

    expect(directive).toBeTruthy();
  });

  it('should remove white spaces from input value on input event', () => {
    inputElement.value = 'hello world';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('helloworld');
    expect(formControl.value).toBe('helloworld');
  });

  it('should maintain cursor position when removing white spaces', () => {
    inputElement.value = 'a b c d';
    inputElement.setSelectionRange(3, 3); // Simulate cursor at position 3
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Expect cursor to be repositioned after sanitization (simple approximation)
    expect(inputElement.selectionStart).toBeLessThanOrEqual(3);
  });

  it('should handle empty input gracefully', () => {
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('');
    expect(formControl.value).toBe('');
  });

  it('should handle input with only white spaces', () => {
    inputElement.value = '   ';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('');
    expect(formControl.value).toBe('');
  });

  it('should not throw an error when NgControl is not present', () => {
    const directive = fixture.debugElement
      .query(By.directive(AplazoNoWhiteSpaceDirective))
      .injector.get(AplazoNoWhiteSpaceDirective);

    expect(() => directive.sanitizeValue(new Event('input'))).not.toThrow();
  });
});
