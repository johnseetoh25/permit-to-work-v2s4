export abstract class TaskStatus {
    static readonly STATUS_NOT_STARTED: string = "Not Started";
    static readonly STATUS_IN_PROGRESS: string = "In Progress";
    static readonly STATUS_COMPLETED: string = "Completed";
    static readonly STATUS_TERMINATED: string = "Terminated";
    static readonly STATUS_EXPIRED: string = "Expired";
}