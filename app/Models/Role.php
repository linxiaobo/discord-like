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
 * @property string $color
 * @property bool $is_admin
 * @property bool $can_manage_messages
 * @property bool $can_manage_channels
 * @property bool $can_manage_roles
 * @property bool $can_manage_server
 * @property bool $can_kick_members
 * @property bool $can_ban_members
 * @property int $position
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Server $server
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCanBanMembers($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCanKickMembers($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCanManageChannels($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCanManageMessages($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCanManageRoles($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCanManageServer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereServerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'server_id',
        'color',
        'is_admin',
        'can_manage_messages',
        'can_manage_channels',
        'can_manage_roles',
        'can_manage_server',
        'can_kick_members',
        'can_ban_members',
        'position',
    ];

    protected $casts = [
        'is_admin' => 'boolean',
        'can_manage_messages' => 'boolean',
        'can_manage_channels' => 'boolean',
        'can_manage_roles' => 'boolean',
        'can_manage_server' => 'boolean',
        'can_kick_members' => 'boolean',
        'can_ban_members' => 'boolean',
    ];

    public function server()
    {
        return $this->belongsTo(Server::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
