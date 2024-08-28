const exhaustiveGuard = (value: never): never => {
  throw new Error(`ERROR! Reached forbidden guard function with unexpected value: ${JSON.stringify(value)}, probably switch case is not exhaustive!`);
};

export default exhaustiveGuard;
