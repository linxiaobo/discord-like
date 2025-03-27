<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property int $server_id
 * @property string $type
 * @property string|null $topic
 * @property bool $is_private
 * @property int $position
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Message> $messages
 * @property-read int|null $messages_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Message> $pinnedMessages
 * @property-read int|null $pinned_messages_count
 * @property-read \App\Models\Server $server
 * @method static \Database\Factories\ChannelFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel whereIsPrivate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel whereServerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel whereTopic($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Channel whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Channel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'server_id',
        'type',
        'topic',
        'is_private',
        'position',
    ];

    protected $casts = [
        'is_private' => 'boolean',
    ];

    public function server()
    {
        return $this->belongsTo(Server::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class)->orderBy('created_at');
    }

    public function pinnedMessages()
    {
        return $this->hasMany(Message::class)->where('is_pinned', true);
    }
}
