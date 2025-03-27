<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $avatar
 * @property string $status online, idle, dnd, offline
 * @property string|null $custom_status
 * @property \Illuminate\Support\Carbon|null $last_active_at
 * @property bool $is_bot
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Invite> $createdInvites
 * @property-read int|null $created_invites_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MessageMention> $mentions
 * @property-read int|null $mentions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Message> $messages
 * @property-read int|null $messages_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Server> $ownedServers
 * @property-read int|null $owned_servers_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MessageReaction> $reactions
 * @property-read int|null $reactions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Server> $servers
 * @property-read int|null $servers_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCustomStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsBot($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereLastActiveAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'status',
        'custom_status',
        'last_active_at',
        'is_bot',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_active_at' => 'datetime',
        'is_bot' => 'boolean',
    ];

    public function servers()
    {
        return $this->belongsToMany(Server::class)
            ->withPivot('nickname', 'joined_at')
            ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function reactions()
    {
        return $this->hasMany(MessageReaction::class);
    }

    public function mentions()
    {
        return $this->hasMany(MessageMention::class, 'mentioned_user_id');
    }

    public function ownedServers()
    {
        return $this->hasMany(Server::class, 'owner_id');
    }

    public function createdInvites()
    {
        return $this->hasMany(Invite::class, 'creator_id');
    }
}
