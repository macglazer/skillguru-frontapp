type Feedback = {
  goalAchievement: string;
  subscriptionEndReason: string;
  serviceDescription: string;
  additional: string;
};

type Input = {
  mentorshipId: number;
  feedback: Feedback;
};

export const sendMentorshipFeedback = async (input: Input): Promise<void> => {
  // @TODO
  await fetch("/fake-api/mentorship-feedback", {
    method: "POST",
    body: JSON.stringify(input),
  });
};
