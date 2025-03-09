import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

import { TYPE_TASK } from '@/types/types';
import { useForm } from '@inertiajs/react';
import { PencilLine, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

const CardTask = (props: TYPE_TASK) => {
    const { setData, put, processing, delete: destroy } = useForm();

    // Handle Menganti Status Task
    const handleChangeStatus = () => {
        put(route('task.changeStatus', props.id), {
            onSuccess: () => alert('Status Berhasil Diubah'),
        });
    };

    // Handle Menghapus Task
    const handleDelete = () => {
        if (confirm('Apakah anda yakin ingin menghapus todo ini?')) {
            destroy(route('task.destroy', props.id));
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h3>{props.title}</h3>
                </CardTitle>
                <CardDescription>
                    <p>{props.description}</p>

                    <div className="mt-4 flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger>
                                <Button variant={'outline'}>
                                    <PencilLine />
                                    Ubah Status
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <form onSubmit={handleChangeStatus}>
                                    <Label>Status</Label>
                                    <Select
                                        value={props.status}
                                        onValueChange={(val) => setData('status', val as 'pending' | 'in_progress' | 'completed')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="in_progress">Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button className="mt-4 min-w-full" disabled={processing}>
                                        {processing ? 'Loading...' : 'Simpan'}
                                    </Button>
                                </form>
                            </PopoverContent>
                        </Popover>
                        <Button onClick={handleDelete} variant='destructive'>
                            <Trash2 />
                        </Button>
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default CardTask;
