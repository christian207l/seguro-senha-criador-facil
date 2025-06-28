
export const generateSecurePassword = (
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string => {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let charset = '';
  let generatedPassword = '';

  if (includeUppercase) charset += uppercaseChars;
  if (includeLowercase) charset += lowercaseChars;
  if (includeNumbers) charset += numberChars;
  if (includeSymbols) charset += symbolChars;

  if (charset === '') {
    throw new Error('At least one character type must be selected');
  }

  // Ensure at least one character of each selected type is included
  if (includeUppercase) {
    const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * uppercaseChars.length);
    generatedPassword += uppercaseChars[randomIndex];
  }
  if (includeLowercase) {
    const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * lowercaseChars.length);
    generatedPassword += lowercaseChars[randomIndex];
  }
  if (includeNumbers) {
    const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * numberChars.length);
    generatedPassword += numberChars[randomIndex];
  }
  if (includeSymbols) {
    const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * symbolChars.length);
    generatedPassword += symbolChars[randomIndex];
  }

  // Fill the rest of the password
  for (let i = generatedPassword.length; i < length; i++) {
    const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * charset.length);
    generatedPassword += charset[randomIndex];
  }

  // Shuffle the password so guaranteed characters aren't at the beginning
  const passwordArray = generatedPassword.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join('');
};
