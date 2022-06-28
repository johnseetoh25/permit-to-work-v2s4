export abstract class RequestStatus {
    static readonly REQUEST_PENDING: string = "Pending";
    static readonly REQUEST_APPROVED: string = "Approved";
    static readonly REQUEST_REJECTED: string = "Rejected";
    static readonly REQUEST_CANCELLED: string = "Cancelled";
    static readonly REQUEST_NULLED: string = "---";
}