<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property int $message_id
 * @property int $mentioned_user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $mentionedUser
 * @property-read \App\Models\Message $message
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageMention newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageMention newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageMention query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageMention whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageMention whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageMention whereMentionedUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageMention whereMessageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageMention whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MessageMention extends Model
{
    use HasFactory;

    protected $fillable = [
        'message_id',
        'mentioned_user_id',
    ];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }

    public function mentionedUser()
    {
        return $this->belongsTo(User::class, 'mentioned_user_id');
    }
}
