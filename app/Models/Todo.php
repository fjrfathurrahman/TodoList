<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'description', 'icon', 'priority', 'completed', 'due_date'];

    /**
     * Fungsi ini mendefinisikan relasi bahwa model ini 
     * memiliki hubungan "belongsTo" (milik) dengan model User.
     * Artinya, model Todo milik model User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Fungsi ini mendefinisikan relasi bahwa model ini
     * memiliki hubungan "hasMany" (memiliki banyak) dengan model Task.
     * Artinya, model Todo memiliki banyak model Task.
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Convert the model to its array form.
     */
    public function toArray()
    {
        $array = parent::toArray();
        $array['status'] = Carbon::now()->gt(Carbon::parse($array['due_date'])) ? 'Terlambat' : null;
        $array['due_date'] = Carbon::parse($array['due_date'])->translatedFormat('d M Y');
        $array['created_at'] = Carbon::parse($array['created_at'])->diffForHumans();

        return $array;
    }
}
