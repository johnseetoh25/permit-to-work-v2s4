export abstract class PermitStatus {
    static readonly STATUS_PROCESSING: string = "Processing";
    static readonly STATUS_VALID: string = "Valid";
    static readonly STATUS_INVALID: string = "---";
    static readonly STATUS_EXPIRED: string = "Expired";
    static readonly STATUS_TERMINATED: string = "Terminated";
    static readonly STATUS_CLOSED: string = "Closed";
}