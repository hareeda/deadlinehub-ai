export interface Assignment {
    id: string;
    title: string;
    subject: string;
    description?: string;
    due_date: string;
    platform?: string;
    priority: string;
    status?: string;
}