<?php

namespace Database\Factories;

use App\Models\Channel;
use App\Models\Server;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChannelFactory extends Factory
{
    protected $model = Channel::class;

    public function definition()
    {
        $types = ['text', 'voice', 'announcement'];

        return [
            'name' => fake()->unique()->words(2, true),
            'server_id' => Server::factory(),
            'type' => fake()->randomElement($types),
            'topic' => fake()->optional(0.4)->sentence(),
            'is_private' => fake()->boolean(20),
            'position' => fake()->numberBetween(0, 10),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    // 状态方法
    public function text()
    {
        return $this->state([
            'type' => 'text',
        ]);
    }

    public function voice()
    {
        return $this->state([
            'type' => 'voice',
        ]);
    }

    public function announcement()
    {
        return $this->state([
            'type' => 'announcement',
        ]);
    }

    public function private()
    {
        return $this->state([
            'is_private' => true,
        ]);
    }

    public function withTopic()
    {
        return $this->state([
            'topic' => fake()->sentence(),
        ]);
    }
}
