import React, { useEffect, useRef, useState } from 'react';
import { useForm, usePage } from "@inertiajs/react";
import { Textarea } from "@/components/ui/textarea";
import { Channel, Message, User } from "@/types";
import useMessageStore, { useMessageActions } from "@/components/chat/message-store";

export default function MessageInput({ channel }: Channel) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { data, setData, post, processing, reset } = useForm({
        content: '',
        client_id: '',
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { props } = usePage<{ channel: { id: string } }>();
    const { addMessage, setMessages } = useMessageActions();
    const currentChannelId = () => useMessageStore((state) => state.currentChannelId);
    const { auth } = usePage().props;
    const currentUser = auth.user as User;
    const [pendingMessages, setPendingMessages] = useState<Record<string, Message>>({});

    // 监听新消息并自动滚动到底部
    useEffect(() => {
        if (!props.channel?.id) {
            return;
        }

        const channelName = `channel.${props.channel.id}`;
        const channelObject = window.Echo.channel(channelName);

        channelObject.listen('MessageSent', ( message ) => {
            console.log('Subscribing to channel:', `channel.${props.channel.id}`);

            const isLocalMessage = message.client_id
                ? Object.keys(pendingMessages).includes(message.client_id)
                : false;

            if (!isLocalMessage) {
                addMessage(message);
            }

            scrollToBottom();
        })

        return () => {
            channelObject.stopListening('MessageSent');
            window.Echo.leaveChannel(`channel.${props.channel.id}`)
        }
    }, [currentChannelId, addMessage]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleChange = (e) => {
        setData('content', e.target.value);
        const clientId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setData('client_id', clientId);
    }

    const handleSubmit =  (e) => {
        e.preventDefault();

        if (!data.content.trim()) return;

        console.log(data);

        const newMessage: Message = {
            id: data.client_id,
            content: data.content.trim(),
            status: 'sending',
            client_id: data.client_id,
            is_pinned: false,
            created_at: new Date().toISOString(),
            user: {
                id: currentUser.id,
                name: currentUser.name,
                avatar: currentUser.avatar,
                status: currentUser.status
            }
        };
        console.log(newMessage);
        addMessage(newMessage);
        setPendingMessages(prev => ({ ...prev, [data.client_id]: newMessage }));

        post(route('channels.messages.store', { channel }), {
            preserveScroll: true,
            onSuccess: (page) => {
                console.log('message is sent successfully');
                reset('content');
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === data.client_id
                            ? { ...newMessage, status: 'sent' }
                            : msg
                    )
                );
            },
            onError: () => {
                // set message to failed status
                setMessages(prev => prev.map(m =>
                    m.id === data.client_id ? {...m, status: 'failed'} : m
                ));
                if (textareaRef.current) textareaRef.current.focus();
            }
        });
    }

    // 定期清理过期的pending消息
    /*useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setPendingMessages(prev => {
                const updated = { ...prev };
                Object.keys(updated).forEach(id => {
                    if (id.startsWith('client-') && now - parseInt(id.split('-')[1]) > 60000) {
                        delete updated[id];
                    }
                });
                return updated;
            });
        }, 30000);

        return () => clearInterval(interval);
    }, []);*/


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
                        onChange={(e) => {handleChange(e)}}
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
