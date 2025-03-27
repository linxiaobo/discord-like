<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property string $code
 * @property int $server_id
 * @property int $creator_id
 * @property int|null $max_uses
 * @property int $uses
 * @property \Illuminate\Support\Carbon|null $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $creator
 * @property-read \App\Models\Server $server
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite whereCreatorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite whereMaxUses($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite whereServerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invite whereUses($value)
 * @mixin \Eloquent
 */
class Invite extends Model
{
    use HasFactory;

    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'server_id',
        'creator_id',
        'max_uses',
        'uses',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function server()
    {
        return $this->belongsTo(Server::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function isValid()
    {
        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        if ($this->max_uses && $this->uses >= $this->max_uses) {
            return false;
        }

        return true;
    }
}
