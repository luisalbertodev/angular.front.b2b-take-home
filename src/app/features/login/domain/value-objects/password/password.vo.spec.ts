import { Password } from './password.vo';

describe('Password Value Object', () => {
  it('should create a Password instance with a valid value', () => {
    const validPassword = 'Password123';
    const password = Password.create(validPassword);

    expect(password.getValue()).toBe(validPassword);
  });

  it('should trim whitespace from input values', () => {
    const validPasswordWithWhitespace = '  Password123  ';
    const password = Password.create(validPasswordWithWhitespace);

    expect(password.getValue()).toBe('Password123');
  });

  it('should throw an error if the password is empty', () => {
    expect(() => Password.create('')).toThrowError('Password cannot be empty.');
  });

  it('should throw an error if the password is less than 8 characters', () => {
    const invalidPassword = 'Pass12';

    expect(() => Password.create(invalidPassword)).toThrowError(
      'Password must be at least 8 characters long and contain at least one letter and one number.'
    );
  });

  it('should throw an error if the password does not contain at least one letter', () => {
    const invalidPassword = '12345678';

    expect(() => Password.create(invalidPassword)).toThrowError(
      'Password must be at least 8 characters long and contain at least one letter and one number.'
    );
  });

  it('should throw an error if the password does not contain at least one number', () => {
    const invalidPassword = 'Password';

    expect(() => Password.create(invalidPassword)).toThrowError(
      'Password must be at least 8 characters long and contain at least one letter and one number.'
    );
  });
});
