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
    /**
 * Convert the model to its array form.
 */
public function toArray()
{
    $array = parent::toArray();
    $dueDate = Carbon::parse($array['due_date']);
    $now = Carbon::now();

    if ($now->gt($dueDate)) {
        $array['status'] = 'Terlambat';
    } else {
        $array['status'] = 'Tepat Waktu';
        $array['days_remaining'] = $now->diffInDays($dueDate) . ' hari lagi';
    }

    $array['due_date'] = $dueDate->translatedFormat('d M Y');
    $array['created_at'] = Carbon::parse($array['created_at'])->diffForHumans();

    return $array;
}

}
