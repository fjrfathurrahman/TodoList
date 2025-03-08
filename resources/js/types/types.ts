export type TYPE_TODO = {
    id: number,
    user_id: number,
    title: string,
    description: string,
    icon: string,
    priority: 'high' | 'medium' | 'low',
    completed: boolean,
    due_date: string,
    created_at: string,
    updated_at: string
}

export type TYPE_TASK = {
    id: number,
    todo_id: number,
    title: string,
    description: string,
    completed: boolean,
    status: 'pending' | 'in_progress' | 'completed',
    priority: 'high' | 'medium' | 'low',
    due_date: string,
    created_at: string,
    updated_at: string
}