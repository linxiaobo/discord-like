import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'

export default function MessageListener() {
    const { props, setPage } = usePage<{ channel: { id: string } }>()

    useEffect(() => {
        if (!props.channel?.id) return

        const channel = window.Echo.private(`channel.${props.channel.id}`)

        channel.listen('MessageSent', (data: { message: any }) => {
            // 这里需要根据你的状态管理方案更新消息列表
            // 例如使用 Zustand 或直接通过 Inertia 的 usePage
            setPage({
                ...props,
                messages: [...props.messages, data.message]
            });

            console.log('New message received:', data.message)
        })

        return () => {
            channel.stopListening('MessageSent')
        }
    }, [props.channel?.id])

    return null
}
