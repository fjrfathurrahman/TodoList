import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
        title: 'Tambah Todo',
        href: '/dashboard/todos/create',
    },
];

interface TYPES_CREATETODO {
    [key: string]: string;
    title: string;
    description: string;
    icon: string;
    priority: 'high' | 'medium' | 'low';
    due_date: string;
}

export default function TodoCreate() {
    const { setData, post, processing, errors, reset } = useForm<TYPES_CREATETODO>();

    // Handle Submit Form Tambah Todo Baru
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('todo.store'), {
            onSuccess: () => alert('Todo Berhasil Ditambahkan'),
            onFinish: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Todo" />

            <div>
                <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
                    <div>
                        <h2>Tambah Todo Baru</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, voluptatum!</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span>
                            <Label>Judul</Label>
                            <Input placeholder="Masukan Judul Todo" onChange={(e) => setData('title', e.target.value)} />
                            <InputError message={errors.title} />
                        </span>
                        <span>
                            <Label>Deskripsi</Label>
                            <Input placeholder="Masukan Deskripsi Todo" onChange={(e) => setData('description', e.target.value)} />
                        </span>
                        <span>
                            <Label>Icon</Label>
                            <Input placeholder="Masukan Icon Todo ( opsional )" onChange={(e) => setData('icon', e.target.value)} />
                        </span>
                        <span>
                            <Label>Prioritas</Label>
                            <Select onValueChange={(val) => setData('priority', val as 'high' | 'medium' | 'low')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Masukan Prioritas Todo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Rendah</SelectItem>
                                    <SelectItem value="medium">Sedang</SelectItem>
                                    <SelectItem value="high">Tinggi</SelectItem>
                                </SelectContent>
                            </Select>
                        </span>
                        <span>
                            <Label>Deadline</Label>
                            <Input type="date" onChange={(e) => setData('due_date', e.target.value)} />
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
