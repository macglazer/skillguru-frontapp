export const generateRandomText = (length: number): string => {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';

  let randomText: string = '';
  for (let i: number = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
}