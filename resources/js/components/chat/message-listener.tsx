import { useRef, useEffect } from 'react';
import { usePage } from "@inertiajs/react";
import { useMessageActions } from "@/components/chat/message-store";

export default function MessageListener() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { props, setPage } = usePage<{ channel: { id: string } }>();
    const { addMessage } = useMessageActions();

    console.log('access listener');

    // 监听新消息并自动滚动到底部
    useEffect(() => {
        console.log('listener');
        if (!props.channel?.id) {
            return;
        }

        const channel = window.Echo.channel(`channel.${props.channel.id}`)

        channel.listen('MessageSent', ( data: { message: any } ) => {
            // 这里可以更新本地消息列表
            console.log('add messages');
            addMessage(data.message);
            scrollToBottom();
        })

        return () => {
            channel.stopListening('MessageSent');
        }
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <div ref={messagesEndRef} />
            <div className="linxiaobo"></div>
        </>
    );
}
