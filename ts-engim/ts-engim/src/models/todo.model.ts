export class Todo {
    private id: string;
    private title: string;
    private description: string;
    private completed: boolean;
    private createdAt: Date;
    private important: boolean;
    private inProgress: boolean;
    private done: boolean;
    private category: TodoCategory;
    
    constructor(id: string, title: string, description: string, completed: boolean, createdAt: Date, important: boolean, inProgress: boolean, done: boolean, category: TodoCategory) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
        this.important = important;
        this.inProgress = inProgress;
        this.done = done;
        this.category = category;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCompleted(): boolean {
        return this.completed;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }   


    public getImportant(): boolean {
        return this.important;
    }

    public getInProgress(): boolean {
        return this.inProgress;
    }

    public getDone(): boolean {
        return this.done;
    }

    public setDone(value: boolean): void {
        this.done = value;
    }

    public getCategory(): TodoCategory {
        return this.category;
    }

    public setCategory(value: TodoCategory): void {
        this.category = value;
    }

    public getId(): string {
        return this.id;
    }

    public setTitle(value: string): void {
        this.title = value;
    }

    public setDescription(value: string): void {
        this.description = value;
    }

    public setImportant(value: boolean): void {
        this.important = value;
    }

    public setInProgress(value: boolean): void {
        this.inProgress = value;
    }
}

export enum TodoCategory {
    WORK = "work",
    PERSONAL = "personal",
    OTHER = "other"
}

export const todoCategoryValues = () => Object.values(TodoCategory);
