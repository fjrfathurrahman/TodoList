import NotFound from '@/components/main/NotFound';
import TaskList from '@/components/main/TaskList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { TYPE_TASK, TYPE_TODO } from '@/types/types';
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
    {
        title: 'Detail Todo',
        href: '#',
    },
];

interface PROPS {
    tasks: TYPE_TASK[];
    todo: TYPE_TODO;
}

// Data kategori prioritas
const STATUS_CATEGORIES = [
    { key: 'pending', label: 'Pending', borderClass: 'border-orange-500' },
    { key: 'in_progress', label: 'Progress', borderClass: 'border-primary' },
    { key: 'completed', label: 'Completed', borderClass: 'border-green-400' },
];

export default function TodoDetail(props: PROPS) {
    const groupedTasks = {
        pending: props.tasks.filter((task) => task.status === 'pending'),
        in_progress: props.tasks.filter((task) => task.status === 'in_progress'),
        completed: props.tasks.filter((task) => task.status === 'completed'),
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Todo" />

            {/* Headline */}
            <div className="mb-8 lg:max-w-2xl">
                <h1>{props.todo.icon}</h1>
                <h2 className="my-4 line-clamp-2">{props.todo.title}</h2>
                <p>{props.todo.description}</p>

                <Button className="mt-4">
                    <Plus/>
                    <Link href={route('task.create', props.todo.id)}>Tambah Tugas</Link>
                </Button>
            </div>

            {/* Content */}
            {props.tasks.length > 0 ? (
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    {STATUS_CATEGORIES.map(({ key, label, borderClass }) => (
                        <TaskList key={key} tasks={groupedTasks[key as keyof typeof groupedTasks]} label={label} borderClass={borderClass} />
                    ))}
                </div>
            ) : (
                <NotFound title="Tidak ada Tugas Ditemukan!" />
            )}
        </AppLayout>
    );
}
