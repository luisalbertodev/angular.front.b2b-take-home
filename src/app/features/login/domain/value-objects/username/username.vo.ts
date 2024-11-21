export class Username {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Username {
    const trimmedValue = value.trim();
    Username.validate(trimmedValue);
    return new Username(trimmedValue);
  }

  private static validate(value: string): void {
    this.ensureNotEmpty(value);
    this.ensureValidEmailFormat(value);
  }

  private static ensureNotEmpty(value: string): void {
    if (!value) {
      throw new Error('Username cannot be empty.');
    }
  }

  private static ensureValidEmailFormat(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format for Username.');
    }
  }

  getValue(): string {
    return this.value;
  }
}
