export class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Password {
    const trimmedValue = value.trim();
    Password.validate(trimmedValue);
    return new Password(trimmedValue);
  }

  private static validate(value: string): void {
    this.ensureNotEmpty(value);
    this.ensureStrongPassword(value);
  }

  private static ensureNotEmpty(value: string): void {
    if (!value) {
      throw new Error('Password cannot be empty.');
    }
  }

  private static ensureStrongPassword(value: string): void {
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number
    if (!strongPasswordRegex.test(value)) {
      throw new Error(
        'Password must be at least 8 characters long and contain at least one letter and one number.'
      );
    }
  }

  getValue(): string {
    return this.value;
  }
}
