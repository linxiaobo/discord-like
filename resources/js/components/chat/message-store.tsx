import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MessageState } from '@/types';

const useMessageStore = create<MessageState>()(
    devtools( // 添加 Redux DevTools 支持
        (set) => ({
            messages: [],
            currentChannelId: null,
            isLoading: false,
            error: null,
            actions: {
                setMessages: (updater) => set(state => {
                    // 1. 获取当前状态
                    const prevMessages = state.messages;

                    // 2. 执行更新函数
                    const nextMessages = updater(prevMessages);

                    // 3. 开发环境调试日志
                    if (process.env.NODE_ENV === 'development') {
                        console.groupCollapsed('[MessageStore] Messages Update');
                        console.log('Previous:', prevMessages);
                        console.log('Next:', nextMessages);

                        // 检测无效更新
                        if (prevMessages === nextMessages) {
                            console.warn('No actual change detected - are you mutating state?');
                        }

                        console.groupEnd();
                    }

                    // 4. 返回新状态
                    return { messages: nextMessages };
                }, false, 'messages/update'),
                addMessage: (message) =>
                    set((state) => ({ messages: [...state.messages, message] })),
                prependMessages: (messages) =>
                    set((state) => ({ messages: [...messages, ...state.messages] })),
                clearMessages: () => set({ messages: [] }),
                setCurrentChannel: (channelId) => set({ currentChannelId: channelId }),
                setLoading: (isLoading) => set({ isLoading }),
                setError: (error) => set({ error }),
            }
        }),
        { name: 'MessageStore' }
    )
);

export const useMessages = () => useMessageStore((state) => state.messages);
export const useMessageActions = () => useMessageStore((state) => state.actions);

export default useMessageStore;

