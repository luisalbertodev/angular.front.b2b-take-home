import { Username } from './username.vo';

describe('Username Value Object', () => {
  it('should create a valid Username instance when the value is a valid email', () => {
    const validEmail = 'user@example.com';
    const username = Username.create(validEmail);

    expect(username.getValue()).toBe(validEmail);
  });

  it('should trim whitespace and create a valid Username instance', () => {
    const validEmailWithWhitespace = '   user@example.com   ';
    const username = Username.create(validEmailWithWhitespace);

    expect(username.getValue()).toBe('user@example.com');
  });

  it('should throw an error if the value is empty', () => {
    expect(() => Username.create('')).toThrowError('Username cannot be empty.');
  });

  it('should throw an error if the value is only whitespace', () => {
    expect(() => Username.create('   ')).toThrowError(
      'Username cannot be empty.'
    );
  });

  it('should throw an error if the value is not a valid email', () => {
    const invalidEmail = 'invalid-email';
    expect(() => Username.create(invalidEmail)).toThrowError(
      'Invalid email format for Username.'
    );
  });

  it('should throw an error if the value is missing "@" in the email format', () => {
    const invalidEmail = 'userexample.com';
    expect(() => Username.create(invalidEmail)).toThrowError(
      'Invalid email format for Username.'
    );
  });

  it('should throw an error if the value has an invalid domain format', () => {
    const invalidEmail = 'user@example';
    expect(() => Username.create(invalidEmail)).toThrowError(
      'Invalid email format for Username.'
    );
  });
});
