<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Route Management Todo 
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('todos', [TodoController::class, 'index'])->name('todo.index');
    Route::get('todo/edit/{todo}', [TodoController::class, 'edit'])->name('todo.edit');
    Route::get('todo/create', [TodoController::class, 'create'])->name('todo.create');
    Route::get('todos/{todo}', [TodoController::class, 'show'])->name('todo.show');

    // Route Actions
    Route::post('todos', [TodoController::class, 'store'])->name('todo.store');
    Route::put('todos/{todo}', [TodoController::class, 'update'])->name('todo.update');
    Route::delete('todos/{todo}', [TodoController::class, 'destroy'])->name('todo.destroy');
});

// Route Management Task
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('task/create/{todo}', [TaskController::class, 'create'])->name('task.create');

    // Route Actions
    Route::post('task', [TaskController::class, 'store'])->name('task.store');
    Route::delete('task/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
    Route::put('task/{task}', [TaskController::class, 'changeStatus'])->name('task.changeStatus');
});