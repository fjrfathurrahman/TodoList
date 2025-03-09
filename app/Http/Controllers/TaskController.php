<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Function untuk menampilakn halaman untuk membuat Task baru
     */
    public function create(Todo $todo)
    {
        return Inertia::render('(tasks)/TaskCreate', [
            'todo' => $todo
        ]);
    }

    /**
     * Function untuk menambahkan Task baru
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'status' => 'required',
            'todo_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $task = Task::create($request->all());

        return to_route('todo.show', $task->todo_id);
    }

    /**
     * Function untuk mengubah status Task
     */
    public function changeStatus(Request $request, Task $task)
    {
        $task->update($request->all());
        return to_route('todo.show', $task->todo_id);
    }

    /**
     * Function untuk menghapus Task
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return to_route('todo.show', $task->todo_id);
    }
}
