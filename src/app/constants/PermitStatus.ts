export abstract class PermitStatus {
    static readonly STATUS_YET_INVALID: string = "Invalid"
    static readonly STATUS_VALID: string = "Valid";
    static readonly STATUS_EXPIRED: string = "Expired";
    static readonly STATUS_TERMINATED: string = "Terminated";
}