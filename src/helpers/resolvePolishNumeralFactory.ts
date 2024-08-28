import { isNil } from 'lodash';

type ResolvePolishNumeralsFactory = (textForOne: string, textForTwoToFour: string, textForRest: string) => (value?: number) => string;

const resolvePolishNumeralFactory: ResolvePolishNumeralsFactory = (textForOne, textForTwoToFour, textForRest) => value => {
  if (isNil(value)) return '';

  if (value === 1) return textForOne;

  const valueStr = `${value}`;
  const lastDigit = +valueStr.charAt(valueStr.length - 1);

  if (lastDigit < 5 && lastDigit > 1) return textForTwoToFour;
  return textForRest;
};

export default resolvePolishNumeralFactory;
