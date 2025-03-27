<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Channel;
use App\Models\Server;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ChannelController extends Controller
{
    /**
     * 显示频道消息页面
     */
    public function show(Server $server, Channel $channel)
    {
        // 授权检查
        //$this->authorize('view', [$channel, $server]);

        // 预加载关系并分页消息
        $channel->load(['server.members', 'messages' => function($query) {
            $query->latest()->with(['user', 'reactions.user'])->paginate(50);
        }]);

        return Inertia::render('chat', [
            'server' => $server->load('channels'),
            'channel' => $channel,
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
     * 存储新消息
     */
    public function storeMessage(Request $request, Channel $channel)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:2000',
            'parent_id' => 'nullable|exists:messages,id'
        ]);

        $message = $channel->messages()->create(array_merge(
            $validated,
            ['user_id' => auth()->id()]
        ));

        // 广播消息事件
        broadcast(new MessageSent($message))->toOthers();

        return back();
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
