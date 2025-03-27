<?php

namespace Database\Factories;

use App\Models\Server;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServerFactory extends Factory
{
    protected $model = Server::class;

    public function definition()
    {
        return [
            'name' => fake()->words(3, true),
            'owner_id' => User::factory(),
            'icon' => fake()->optional(0.7)->imageUrl(64, 64, 'abstract'),
            'description' => fake()->optional(0.5)->sentence(),
            'is_public' => fake()->boolean(90),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Server $server) {
            // 创建服务器时自动将所有者添加为成员
            $server->members()->attach($server->owner_id, [
                'nickname' => fake()->optional(0.3)->firstName,
                'joined_at' => now(),
            ]);

            // 50%概率创建默认频道
            if (fake()->boolean(50)) {
                $server->channels()->create([
                    'name' => 'general',
                    'type' => 'text',
                    'position' => 0,
                ]);
            }
        });
    }

    // 状态方法
    public function private()
    {
        return $this->state([
            'is_public' => false,
        ]);
    }

    public function withIcon()
    {
        return $this->state([
            'icon' => fake()->imageUrl(64, 64, 'abstract'),
        ]);
    }
}
