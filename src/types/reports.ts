export type ReportStatus =
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "requires_capture"
    | "canceled"
    | "succeeded"
    | "complete";

export type Report = {
  id: number;
  invoiceNo: string;
  date: string;
  amount: number;
  status: ReportStatus;
  sessionTitle: string;
  invoiceFileUrl: string;
};
