import { Report } from "@customTypes/reports"

export type FetchPaymentReportsServiceInput = {
    page?: number
    take?: number
    skip?: number
    sortBy?: string
    sortMethod?: string
}

export type FetchPaymentReportsServiceOutput = {
    success: false
    errorMessage: string
}|{
    reports: Report[]
    total: number
    success: true
}
