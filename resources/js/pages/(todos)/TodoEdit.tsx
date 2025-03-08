import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import AppLayout from '@/layouts/app-layout';
import { TYPE_TODO } from '@/types/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function TodoEdit({ todo }: { todo: TYPE_TODO }) {
    const { put, processing, setData } = useForm<TYPE_TODO>()

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('todo.update', todo.id), {
            onSuccess: () => alert('Todo Berhasil Diupdate'),
        });
    };

    return (
        <AppLayout>
            <Head title="Update Todo" />

            <div>
                <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
                    <div>
                        <h2>Update Todo</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, voluptatum!</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span>
                            <Label>Judul</Label>
                            <Input placeholder="Masukan Judul Todo" minLength={10} maxLength={225} defaultValue={todo.title} onChange={(e) => setData('title', e.target.value)} />
                        </span>
                        <span>
                            <Label>Deskripsi</Label>
                            <Textarea placeholder="Masukan Deskripsi Todo" minLength={25} maxLength={225} required defaultValue={todo.description} onChange={(e) => setData('description', e.target.value)} />
                        </span>
                        <span>
                            <Label>Icon</Label>
                            <Input placeholder="Masukan Icon Todo" minLength={1} maxLength={2} required defaultValue={todo.icon} onChange={(e) => setData('icon', e.target.value)} />
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
