import NotFound from '@/components/main/NotFound';
import TodoList from '@/components/main/TodoList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { TYPE_TODO } from '@/types/types';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Todos',
        href: '/dashboard/todos',
    },
];

interface PROPS {
    todos: TYPE_TODO[];
}

// Data kategori prioritas
const PRIORITY_CATEGORIES = [
    { key: 'low', label: 'Low', borderClass: 'border-secondary' },
    { key: 'medium', label: 'Medium', borderClass: 'border-primary' },
    { key: 'high', label: 'High', borderClass: 'border-orange-400' },
];

export default function TodoView({ todos }: PROPS) {
    const groupedTodos = {
        low: todos.filter((todo) => todo.priority === 'low'),
        medium: todos.filter((todo) => todo.priority === 'medium'),
        high: todos.filter((todo) => todo.priority === 'high'),
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todo" />

            {/* Headline */}
            <div className="space-y-4 border-b pb-6">
                <div>
                    <h2>Daftar Todo Anda.</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi blanditiis distinctio officia ipsa expedita, nostrum in?</p>
                </div>

                <Link href="/dashboard/todo/create">
                    <Button>
                        <Plus />
                        Tambah Todo
                    </Button>
                </Link>
            </div>

            {/* Content */}
            {todos.length > 0 ? (
                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {PRIORITY_CATEGORIES.map(({ key, label, borderClass }) => (
                        <TodoList key={key} label={label} todos={groupedTodos[key as keyof typeof groupedTodos]} borderClass={borderClass} />
                    ))}
                </div>
            ) : (
                <NotFound title="Tidak ada Todo Ditemukan!" />
            )}
        </AppLayout>
    );
}
