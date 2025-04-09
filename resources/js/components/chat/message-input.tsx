import React, { useEffect, useRef, useState } from 'react';
import { useForm, usePage } from "@inertiajs/react";
import { Textarea } from "@/components/ui/textarea";
import { Channel } from "@/types";
import useMessageStore, { useMessageActions } from "@/components/chat/message-store";

export default function MessageInput({ channel }: Channel) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { data, setData, post, processing, reset } = useForm({
        content: ''
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { props } = usePage<{ channel: { id: string } }>();
    const { addMessage } = useMessageActions();
    const currentChannelId = () => useMessageStore((state) => state.currentChannelId);

    // 监听新消息并自动滚动到底部
    useEffect(() => {
        if (!props.channel?.id) {
            return;
        }

        const channelName = `channel.${props.channel.id}`;
        const channelObject = window.Echo.channel(channelName);

        channelObject.listen('MessageSent', ( data: { message: any } ) => {
            console.log('Subscribing to channel:', `channel.${props.channel.id}`);
            // 这里可以更新本地消息列表
            addMessage(data.message);
            scrollToBottom();
        })

        return () => {
            channelObject.stopListening('MessageSent');
            window.Echo.leaveChannel(`channel.${props.channel.id}`)
        }
    }, [currentChannelId, addMessage])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSubmit =  (e) => {
        e.preventDefault();

        if (!data.content.trim()) return;

        post(route('channels.messages.store', { channel }), {
            preserveScroll: true,
            onSuccess: (page) => {
                console.log('message is sent successfully');
                reset('content');
            },
            onError: () => {
                // 简单错误处理
                if (textareaRef.current) textareaRef.current.focus()
            }
        });
    }

    return (
        <div className="bg-gray-600 rounded-lg px-4 py-2">
            <div className="flex items-center">
                <form onSubmit={handleSubmit} className="flex w-full">
                    <button className="text-gray-400 hover:text-gray-200 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                    </button>
                    <Textarea
                        ref={textareaRef}
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="min-h-[44px] max-h-[200px] bg-discord-dark-300 border-none resize-none pr-16"
                        placeholder={`Message #todo`}
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSubmit(e)
                            }
                        }}
                    />
                    <button type="submit" disabled={!data.content.trim()}>
                        发送
                    </button>
                </form>
            </div>
        </div>
    );
}
