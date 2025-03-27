<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $icon
 * @property int $owner_id
 * @property string|null $description
 * @property int $is_public
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Channel> $channels
 * @property-read int|null $channels_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Invite> $invites
 * @property-read int|null $invites_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $members
 * @property-read int|null $members_count
 * @property-read \App\Models\User $owner
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * @property-read int|null $roles_count
 * @method static \Database\Factories\ServerFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server whereIsPublic($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Server whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Server extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
        'owner_id',
        'description',
        'is_public',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('nickname', 'joined_at')
            ->withTimestamps();
    }

    public function channels()
    {
        return $this->hasMany(Channel::class)->orderBy('position');
    }

    public function roles()
    {
        return $this->hasMany(Role::class)->orderBy('position');
    }

    public function invites()
    {
        return $this->hasMany(Invite::class);
    }

    public function textChannels()
    {
        return $this->channels()->where('type', 'text');
    }

    public function voiceChannels()
    {
        return $this->channels()->where('type', 'voice');
    }
}
