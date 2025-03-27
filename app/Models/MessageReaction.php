<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property int $message_id
 * @property int $user_id
 * @property string $emoji
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Message $message
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereEmoji($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereMessageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereUserId($value)
 * @mixin \Eloquent
 */
class MessageReaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'message_id',
        'user_id',
        'emoji',
    ];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
