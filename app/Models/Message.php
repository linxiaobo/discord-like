<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 *
 * @property int $id
 * @property string $content
 * @property int $user_id
 * @property int $channel_id
 * @property int|null $parent_id
 * @property bool $is_pinned
 * @property \Illuminate\Support\Carbon|null $edited_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Channel $channel
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MessageMention> $mentions
 * @property-read int|null $mentions_count
 * @property-read Message|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MessageReaction> $reactions
 * @property-read int|null $reactions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Message> $replies
 * @property-read int|null $replies_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\MessageFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereChannelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereEditedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereIsPinned($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message withoutTrashed()
 * @mixin \Eloquent
 */
class Message extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'content',
        'user_id',
        'channel_id',
        'parent_id',
        'is_pinned',
        'edited_at',
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
        'edited_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function parent()
    {
        return $this->belongsTo(Message::class, 'parent_id');
    }

    public function replies()
    {
        return $this->hasMany(Message::class, 'parent_id');
    }

    public function reactions()
    {
        return $this->hasMany(MessageReaction::class);
    }

    public function mentions()
    {
        return $this->hasMany(MessageMention::class);
    }
}
