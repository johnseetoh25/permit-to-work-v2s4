export abstract class TaskStatus {
    static readonly STATUS_NOT_STARTED: string = "Not Started";
    static readonly STATUS_IN_PROGRESS: string = "In Progress";
    static readonly STATUS_COMPLETED: string = "Completed";
    static readonly STATUS_CONDITION_CHANGED: string = "Cond. Changed";
    static readonly STATUS_OVERTIME: string = "Overtime";
}