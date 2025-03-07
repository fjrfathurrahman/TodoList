import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

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
    message: {
        title: string;
        description: string;
    };
}

export default function TodoView({ message }: PROPS) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todo" />

            {/* Headline */}
            <div className="space-y-4 border-b pb-6">
                <div>
                    <h2>{message.title}</h2>
                    <p>{message.description}</p>
                </div>

                <Link href="/dashboard/todos/create">
                    <Button>
                        <Plus />
                        Tambah Todo
                    </Button>
                </Link>
            </div>

            {/* Content */}
        </AppLayout>
    );
}
