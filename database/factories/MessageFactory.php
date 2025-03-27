<?php

namespace Database\Factories;

use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    protected $model = Message::class;

    public function definition()
    {
        return [
            'content' => fake()->sentence,
            'user_id' => User::factory(),
            'channel_id' => Channel::factory(),
            'parent_id' => null,
            'is_pinned' => fake()->boolean(5),
            'edited_at' => fake()->optional(0.1)->dateTimeThisYear(),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    protected function generateMessageContent()
    {
        $contentTypes = [
            fake()->sentence,
            fake()->paragraph,
            fake()->sentences(3, true)
        ];

        return call_user_func(fake()->randomElement($contentTypes));
    }

    // 状态方法
    public function reply()
    {
        return $this->state(function (array $attributes) {
            return [
                'parent_id' => Message::factory()->create([
                    'channel_id' => $attributes['channel_id']
                ]),
            ];
        });
    }

    public function pinned()
    {
        return $this->state([
            'is_pinned' => true,
        ]);
    }

    public function edited()
    {
        return $this->state([
            'edited_at' => fake()->dateTimeThisYear(),
        ]);
    }

    public function withReactions($count = 1)
    {
        return $this->afterCreating(function (Message $message) use ($count) {
            $emojis = ['👍', '❤️', '😂', '😮', '😢', '🎉'];

            for ($i = 0; $i < $count; $i++) {
                $message->reactions()->create([
                    'user_id' => User::factory(),
                    'emoji' => fake()->randomElement($emojis),
                ]);
            }
        });
    }

    public function withMentions($count = 1)
    {
        return $this->afterCreating(function (Message $message) use ($count) {
            $users = User::inRandomOrder()->limit($count)->get();

            if ($users->isEmpty()) {
                $users = User::factory()->count($count)->create();
            }

            foreach ($users as $user) {
                $message->mentions()->create([
                    'mentioned_user_id' => $user->id,
                ]);
            }

            // 更新消息内容以包含提及
            $mentionText = $users->map(fn($user) => "@{$user->name}")->join(' ');
            $message->update([
                'content' => $mentionText . " " . $message->content
            ]);
        });
    }
}
