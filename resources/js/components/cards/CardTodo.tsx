import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarClock, Clock, Equal, FileCheck, Info, Pencil, Trash2, Wand } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

import { TYPE_TODO } from '@/types/types';
import { Link, useForm } from '@inertiajs/react';

const CardTodo = (props: TYPE_TODO & { tasks_count: number, completed_tasks_count: number }) => {
    const { delete: destroy } = useForm();

    // Handle Delete Todo
    const handleDelete = () => {
        if (confirm('Apakah anda yakin ingin menghapus todo ini?')) {
            destroy(route('todo.destroy', props.id));
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h1>{props.icon}</h1>
                    <h3 className="my-2 line-clamp-2">{props.title}</h3>
                </CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex justify-between">
                <span className="flex items-center gap-2">
                    <FileCheck size={18} />
                    <small>?/{props.tasks_count}</small>
                </span>
                <span className="flex items-center gap-2">
                    <CalendarClock size={18} />
                    <small>{props.due_date}</small>
                </span>
                <span className="flex items-center gap-2">
                    <Clock size={18} />
                    <small>{props.created_at}</small>
                </span>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Equal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel className="flex items-center gap-2">
                            <Wand size={18} />
                            Aksi
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/dashboard/todos/${props.id}`} className="flex items-center gap-2">
                                <Info />
                                Detail Todo
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete}>
                            <Trash2 />
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = `/dashboard/todo/edit/${props.id}`}>
                            <Pencil />
                            Update
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardContent>
        </Card>
    );
};

export default CardTodo;
