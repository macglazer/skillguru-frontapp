const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const restoreMentorship = async (
  mentorshipId: number
): Promise<void> => {
  await delay(1000);
};
