<?php

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


Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('todos', [TodoController::class, 'index'])->name('todo.index');
    Route::get('todos/create', [TodoController::class, 'create'])->name('todo.create');
    Route::get('todos/{todo}', [TodoController::class, 'show'])->name('todo.show');

    Route::post('todos', [TodoController::class, 'store'])->name('todo.store');
});