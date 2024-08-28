const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const suspendMentorship = async (
  mentorshipId: number
): Promise<void> => {
  await delay(1000);
};
