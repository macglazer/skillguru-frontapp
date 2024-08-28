import { ServiceMentoring, ServiceSession } from "@customTypes/order";

export type Input = {
  mentorId: string;
};

export type OutputSuccess = {
  success: true;
  session: ServiceSession[];
  mentoring: ServiceMentoring[];
};

export type OutputFailed = {
  success: false;
  error: string;
};
