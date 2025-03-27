<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\Message;
use App\Models\Server;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // 创建测试用户
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // 创建10个用户
        $users = User::factory()
            ->count(10)
            ->create();

        // 创建5个服务器，每个服务器有3-5个频道
        $servers = Server::factory()
            ->count(5)
            ->has(
                Channel::factory()
                    ->count(fake()->numberBetween(3, 5))
                    ->state(function (array $attributes, Server $server) {
                        return ['position' => fake()->numberBetween(0, 10)];
                    })
            )
            ->create();

        // 将用户添加到服务器
        $servers->each(function ($server) use ($users, $testUser) {
            // 确保测试用户在所有服务器中
            $server->members()->attach($testUser->id, [
                'nickname' => fake()->optional(0.3)->firstName,
                'joined_at' => now(),
            ]);

            // 随机添加3-8个用户到每个服务器
            $server->members()->attach(
                $users->random(fake()->numberBetween(3, 8))
                    ->mapWithKeys(function ($user) {
                        return [
                            $user->id => [
                                'nickname' => fake()->optional(0.3)->firstName,
                                'joined_at' => now(),
                            ]
                        ];
                    })
            );
        });

        // 为每个频道创建10-30条消息
        Channel::all()->each(function ($channel) {
            Message::factory()
                ->count(fake()->numberBetween(10, 30))
                ->create(['channel_id' => $channel->id]);

            // 创建一些回复消息
            Message::factory()
                ->count(fake()->numberBetween(3, 8))
                ->reply()
                ->create(['channel_id' => $channel->id]);

            // 创建一些带反应的消息
            Message::factory()
                ->count(fake()->numberBetween(2, 5))
                //->withReactions(fake()->numberBetween(1, 5))
                ->create(['channel_id' => $channel->id]);

            // 创建一些提及消息
            Message::factory()
                ->count(fake()->numberBetween(2, 5))
                //->withMentions(fake()->numberBetween(1, 3))
                ->create(['channel_id' => $channel->id]);
        });

        // 创建一个演示服务器，带有完整的数据结构
        $demoServer = Server::factory()
            ->has(
                Channel::factory()
                    ->count(5)
                    ->sequence(
                        ['name' => 'welcome', 'type' => 'text', 'position' => 0],
                        ['name' => 'general', 'type' => 'text', 'position' => 1],
                        ['name' => 'random', 'type' => 'text', 'position' => 2],
                        ['name' => 'voice-chat', 'type' => 'voice', 'position' => 3],
                        ['name' => 'announcements', 'type' => 'announcement', 'position' => 4],
                    )
            )
            ->create([
                'name' => 'Demo Server',
                'owner_id' => $testUser->id,
                'description' => 'This is a demo server to showcase the application features',
                'is_public' => true,
            ]);

        // 添加所有用户到演示服务器
        /*$demoServer->members()->attach(
            $users->pluck('id')->unique()->push($testUser->id)
                ->mapWithKeys(function ($id) {
                    return [$id => ['joined_at' => now()]];
                })
        );*/

        // 随机添加3-8个用户到每个服务器
        $demoServer->members()->attach(
            $users->random(fake()->numberBetween(3, 8))
                ->mapWithKeys(function ($user) {
                    return [
                        $user->id => [
                            'nickname' => fake()->optional(0.3)->firstName,
                            'joined_at' => now(),
                        ]
                    ];
                })
        );

        // 为演示服务器创建丰富的消息数据
        $demoServer->channels->each(function ($channel) use ($users, $testUser) {
            // 欢迎频道 - 系统风格消息
            if ($channel->name === 'welcome') {
                Message::factory()
                    ->count(3)
                    ->sequence(
                        [
                            'user_id' => $testUser->id,
                            'content' => "Welcome to our server! Please read the rules in #general",
                            'created_at' => now()->subDays(7),
                        ],
                        [
                            'user_id' => $testUser->id,
                            'content' => "This is a demo of a Discord-like chat application",
                            'created_at' => now()->subDays(6),
                        ],
                        [
                            'user_id' => $testUser->id,
                            'content' => "Feel free to explore the different channels and features!",
                            'created_at' => now()->subDays(5),
                        ]
                    )
                    ->create(['channel_id' => $channel->id]);

                Message::factory()
                    ->create([
                        'channel_id' => $channel->id,
                        'user_id' => $testUser->id,
                        'content' => "Here's a pinned message!",
                        'is_pinned' => true,
                        'created_at' => now()->subDays(4),
                    ]);
            }

            // 通用频道 - 模拟真实对话
            if ($channel->name === 'general') {
                $generalMessages = [
                    ['user' => $users[0], 'content' => 'Hey everyone! How are you doing?', 'days_ago' => 4],
                    ['user' => $users[1], 'content' => "I'm good! Just working on some projects.", 'days_ago' => 4],
                    ['user' => $testUser, 'content' => "Don't forget we have a meeting tomorrow at 2PM", 'days_ago' => 3],
                    ['user' => $users[2], 'content' => "Thanks for the reminder @{$testUser->name}", 'days_ago' => 3],
                    ['user' => $users[3], 'content' => "Can someone help me with the new feature?", 'days_ago' => 2],
                    ['user' => $users[4], 'content' => "Sure, what do you need help with?", 'days_ago' => 2],
                    ['user' => $users[0], 'content' => "Check out this cool article I found: https://example.com", 'days_ago' => 1],
                ];

                foreach ($generalMessages as $msg) {
                    Message::factory()
                        ->create([
                            'channel_id' => $channel->id,
                            'user_id' => $msg['user']->id,
                            'content' => $msg['content'],
                            'created_at' => now()->subDays($msg['days_ago']),
                        ]);
                }

                // 创建一个带有多重回复的线程
                $parentMsg = Message::factory()
                    ->create([
                        'channel_id' => $channel->id,
                        'user_id' => $users[5]->id,
                        'content' => 'What do you think about the new design?',
                        'created_at' => now()->subDay(),
                    ]);

                Message::factory()
                    ->count(5)
                    ->state([
                        'channel_id' => $channel->id,
                        'parent_id' => $parentMsg->id,
                    ])
                    ->create();
            }

            // 为其他频道创建随机消息
            if (!in_array($channel->name, ['welcome', 'general'])) {
                Message::factory()
                    ->count(fake()->numberBetween(5, 15))
                    ->create(['channel_id' => $channel->id]);
            }
        });
    }
}
