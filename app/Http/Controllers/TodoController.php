<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TodoController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('(todos)/TodoView', [
            'message' => [
                'title' => 'Daftar Todo.',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ex velit vero at?'
            ],
        ]);
    }

    /**
     * Function untuk menampilkan Todo berdasarkan ID
     */
    public function show(Todo $todo)
    {
        return to_route('todo.index', [
            'todo' => $todo,
            // 'tasks' => 
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
     * Function untuk membuat Todo Baru
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'icon' => 'nullable|min:1|max:1',
            'title' => 'required',
            'description' => 'required',
            'priority' => 'required',
            'due_date' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

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
            'icon' => 'required|min:1|max:1',
            'title' => 'required',
            'description' => 'required',
            'priority' => 'required',
            'due_date' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

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
