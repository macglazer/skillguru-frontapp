export type Config = {
  goalAchievement: {
    question: string;
    options: string[];
  };
  subscriptionEndReasons: {
    question: string;
    options: string[];
  };
  serviceDescription: {
    question: string;
    options: string[];
  };
  additional: {
    question: string;
  };
};

export type Feedback = {
  goalAchievement: string;
  subscriptionEndReason: string;
  serviceDescription: string;
  additional: string;
};
