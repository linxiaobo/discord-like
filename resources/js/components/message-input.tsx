// resources/js/Components/MessageInput.tsx
import { useForm } from '@inertiajs/react'
import { Textarea } from '@/Components/ui/textarea'
import { Button } from '@/Components/ui/button'
import { useRef, useState } from 'react'

export default function MessageInput({ channelId }: { channelId: string }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { data, setData, post, processing, reset } = useForm({
        content: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!data.content.trim()) return

        post(route('channels.messages.store', { channel: channelId }), {
            preserveScroll: true,
            onSuccess: () => reset('content'),
            onError: () => {
                // 简单错误处理
                if (textareaRef.current) textareaRef.current.focus()
            }
        })
    }

    return (
        <div className="px-4 pb-4">
            <form onSubmit={handleSubmit} className="relative">
                <Textarea
                    ref={textareaRef}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    placeholder={`Message #${channelId}`}
                    className="min-h-[44px] max-h-[200px] bg-discord-dark-300 border-none resize-none pr-16"
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmit(e)
                        }
                    }}
                />

                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 bottom-2 h-8 w-8 text-gray-400 hover:text-gray-200 hover:bg-discord-dark-400"
                    disabled={processing || !data.content.trim()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                    </svg>
                </Button>
            </form>
        </div>
    )
}
