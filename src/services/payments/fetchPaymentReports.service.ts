import {
  FetchPaymentReportsServiceInput,
  FetchPaymentReportsServiceOutput,
} from "./fetchPaymentReports.types";
import axios from "axios";
import {Report} from "@customTypes/reports";

export const fetchPaymentReports = async ({
                                            take = 10,
                                            skip = 0,
                                            sortBy,
                                            sortMethod,
                                          }: FetchPaymentReportsServiceInput): Promise<FetchPaymentReportsServiceOutput> => {
  try {
    const res = await axios.get('/api/payment/reports');
    const data: Report[] = res.data.data; // Assuming the response directly contains an array of Report objects

    // Sorting logic if sortBy and sortMethod are provided
    if (sortBy && sortMethod) {
      data.sort((a: Report, b: Report) => {
        const aValue = a[sortBy as keyof Report];
        const bValue = b[sortBy as keyof Report];
        if (sortMethod === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    // Pagination logic
    const start = skip;
    const end = start + take;
    const reports = data.slice(start, end);

    return {
      reports,
      total: data.length,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'error'
    };
  }
};