<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Models\Channel;
use App\Models\Server;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class ChannelController extends Controller
{
    /**
     * @param Server $server
     * @param Channel $channel
     * @return Response
     */
    public function home(Server $server, Channel $channel): Response
    {
        // 预加载关系并分页消息
        $channel->load(['server.members', 'messages' => function($query) {
            $query->latest()->with(['user', 'reactions.user'])->paginate(50);
        }]);

        return Inertia::render('channel-home', [
            'server' => $server->load('channels'),
            'channel' => $channel,
            'latest_messages' => $channel->getLatestMessages()->values(),
            'servers' => auth()->user()->servers()
                ->withCount(['channels as unread_count' => function($query) {
                    $query->whereHas('messages', function($q) {
                        $q->where('created_at', '>', now()->subDay())
                            /*->whereDoesntHave('reads', function($q) {
                                $q->where('user_id', auth()->id());
                            })*/;
                    });
                }])
                ->get(),
            'permissions' => [
                'can_create_channel' => Gate::allows('create', [Channel::class, $server]),
                'can_manage_channel' => Gate::allows('update', $channel),
            ]
        ]);
    }

    /**
     * 显示频道消息页面
     */
    public function show(Server $server, Channel $channel)
    {
        // 预加载关系并分页消息
        $channel->load(['server.members', 'messages' => function($query) {
            // $query->latest()->with(['user', 'reactions.user'])->paginate(50);

            // 先按最新排序获取消息ID
            $latestMessageIds = $query
                ->latest()
                ->take(50)
                ->pluck('id');

            // 然后按正序获取完整消息数据
            return $query
                ->whereIn('id', $latestMessageIds)
                ->oldest() // 正序排列
                ->with(['user', 'reactions.user']);
        }]);

        return Inertia::render('chat', [
            'server' => $server->load('channels'),
            'channel' => $channel,
            'messages' => $channel->getLatestMessages(),
            'servers' => auth()->user()->servers()
                ->withCount(['channels as unread_count' => function($query) {
                    $query->whereHas('messages', function($q) {
                        $q->where('created_at', '>', now()->subDay())
                            /*->whereDoesntHave('reads', function($q) {
                                $q->where('user_id', auth()->id());
                            })*/;
                    });
                }])
                ->get(),
            'permissions' => [
                'can_create_channel' => Gate::allows('create', [Channel::class, $server]),
                'can_manage_channel' => Gate::allows('update', $channel),
            ]
        ]);
    }

    /**
     * 显示创建频道表单
     */
    public function create(Server $server)
    {
        return Inertia::render('Channel/Create', [
            'server' => $server,
            'types' => ['text', 'voice', 'announcement']
        ]);
    }

    /**
     * 存储新频道
     */
    public function store(Request $request, Server $server)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'type' => 'required|in:text,voice,announcement',
            'topic' => 'nullable|string|max:255',
            'is_private' => 'boolean'
        ]);

        $channel = $server->channels()->create(array_merge(
            $validated,
            ['position' => $server->channels()->count()]
        ));

        return redirect()->route('channels.show', [
            'server' => $server->id,
            'channel' => $channel->id
        ]);
    }

    /**
     * 显示编辑频道表单
     */
    public function edit(Server $server, Channel $channel)
    {
        return Inertia::render('Channel/Edit', [
            'server' => $server,
            'channel' => $channel,
            'types' => ['text', 'voice', 'announcement']
        ]);
    }

    /**
     * 更新频道
     */
    public function update(Request $request, Server $server, Channel $channel)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'type' => 'required|in:text,voice,announcement',
            'topic' => 'nullable|string|max:255',
            'is_private' => 'boolean',
            'position' => 'integer'
        ]);

        $channel->update($validated);

        return redirect()->route('channels.show', [
            'server' => $server->id,
            'channel' => $channel->id
        ]);
    }

    /**
     * 删除频道
     */
    public function destroy(Server $server, Channel $channel)
    {
        $channel->delete();

        // 重定向到服务器的第一个频道或服务器主页
        $firstChannel = $server->channels()->orderBy('position')->first();

        return $firstChannel
            ? redirect()->route('channels.show', [
                'server' => $server->id,
                'channel' => $firstChannel->id
            ])
            : redirect()->route('servers.show', $server->id);
    }

    /**
     * 更新消息
     */
    public function updateMessage(Request $request, Channel $channel, Message $message)
    {
        $this->authorize('update', $message);

        $validated = $request->validate([
            'content' => 'required|string|max:2000'
        ]);

        $message->update(array_merge(
            $validated,
            ['edited_at' => now()]
        ));

        return back();
    }

    /**
     * 删除消息
     */
    public function destroyMessage(Channel $channel, Message $message)
    {
        $this->authorize('delete', $message);

        $message->delete();

        return back();
    }
}
