import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { TYPE_TODO } from '@/types/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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
    {
        title: 'Tambah Tugas',
        href: '#',
    },
];


interface TYPES_CREATETASK {
    [key: string]: string | number;
    todo_id: number | string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
}


export default function TaskCreate({ todo }: { todo: TYPE_TODO }) {
    const { setData, post, processing, errors, reset } = useForm<TYPES_CREATETASK>({
        todo_id: todo.id,
        title: '',
        description: '',
        status: 'pending',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('task.store'), {
            onSuccess: () => alert('Tugas Berhasil Ditambahkan'),
            onFinish: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menambah Tugas Baru" />

            <div>
                <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
                    <div>
                        <h2>Tambah Tugas Baru</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, voluptatum!</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span>
                            <Label>Judul</Label>
                            <Input placeholder="Masukan Judul Tugas" required minLength={10} maxLength={225} onChange={(e) => setData('title', e.target.value)} />
                        </span>
                        <span>
                            <Label>Deskripsi</Label>
                            <Input placeholder="Masukan Deskripsi Tugas" required minLength={25} maxLength={225} onChange={(e) => setData('description', e.target.value)} />
                            <InputError message={errors.description} />
                        </span>
                        <span>
                            <Label>Status</Label>
                            <Select onValueChange={(val) => setData('status', val as 'pending' | 'in_progress' | 'completed')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Masukan Status Tugas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in_progress">Proses</SelectItem>
                                    <SelectItem value="completed">Selesai</SelectItem>
                                </SelectContent>
                            </Select>
                        </span>
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Loading...' : 'Simpan'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
