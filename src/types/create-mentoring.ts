export type PlanInput = {
  schedule: string;
  price: number;
  description: string;
  sessionsPerMonth: number;
  sessionDuration: number;
  responseTime: number;
  // additional: string[];
  planIncludes: string[];
  planType: 'basic'|'advanced'|'pro';
};
