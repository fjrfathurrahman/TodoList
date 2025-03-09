<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'todo_id',
        'title',
        'description',
        'completed',
        'status',
        'priority',
        'due_date',
    ];

    /**
     * Fungsi ini mendefinisikan relasi bahwa model ini
     * memiliki hubungan "belongsTo" (milik) dengan model Todo.
     * Artinya, model Task milik model Todo.
     */
    public function todo()
    {
        return $this->belongsTo(Todo::class);
    }

    public function toArray()
    {
        $array = parent::toArray();
        $array['created_at'] = Carbon::parse($array['created_at'])->diffForHumans();

        return $array;
    }
}
