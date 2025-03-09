<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TodoController extends Controller
{
    // Function untuk menampilkan daftar Todo 
    public function index()
    {
        return Inertia::render('(todos)/TodoView', [
            'todos' => Todo::where('user_id', Auth::id())->withCount([ 'tasks',
                // 'tasks as completed_tasks_count' => function ($query) {
                //     $query->where('status', 'completed'); 
                // }
            ])->latest()->get(),
        ]);
    }

    /**
     * Function untuk menampilkan Todo berdasarkan ID
     */
    public function show(Todo $todo)
    {
        return Inertia::render('(todos)/TodoDetail', [
            'todo' => $todo,
            'tasks' => Task::where('todo_id', $todo->id)->latest()->get(),
        ]);
    }

    /**
     * Function untuk menampilkan halaman untuk membuat Todo baru 
     */
    public function create()
    {
        return Inertia::render('(todos)/TodoCreate');
    }

    /**
     * Function untuk menampilkan halaman untuk mengedit Todo berdasarkan ID
     */
    public function edit(Todo $todo)
    {
        return Inertia::render('(todos)/TodoEdit', [
            'todo' => $todo,
        ]);
    }

    /**
     * Function untuk membuat Todo Baru
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'icon' => 'nullable|min:1|max:1',
            'title' => 'required',
            'description' => 'required|max:225',
            'priority' => 'required',
            'due_date' => 'required',
        ]);

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()], 422);
        // }

        $request->merge(['user_id' => Auth::id()]);

        Todo::create($request->all());
        return to_route('todo.index');
    }

    /**
     * Function untuk mengupdate Todo berdasarkan ID
     */
    public function update(Request $request, Todo $todo)
    {
        $validator = Validator::make($request->all(), [
            'icon' => 'nullable|min:1|max:1',
            'title' => 'nullable',
            'description' => 'nullable',
            'priority' => 'nullable',
            'due_date' => 'nullable',
        ]);

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()], 422);
        // }

        $todo->update($request->all());

        return to_route('todo.index');
    }

    /**
     * Function untuk menghapus Todo berdasarkan ID
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return to_route('todo.index');
    }
}
