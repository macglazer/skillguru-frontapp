function numberBetween(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export const rangeValueParser =
  (min: number, max: number) =>
  (type: "min" | "max", value: string, valueMin: number, valueMax: number): number => {
    const numbersArray = value.match(/\d+/g);
    if (!numbersArray) {
      return 0;
    }
    const normalizedValue = Number(numbersArray.join(""));
    switch (type) {
      case "min":
        return numberBetween(numberBetween(normalizedValue, min, max), min, valueMax);
      case "max":
        return numberBetween(numberBetween(normalizedValue, min, max), valueMin, max);
      default:
        return 0;
    }
  };
