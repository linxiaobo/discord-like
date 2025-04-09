import { create } from 'zustand';
import { MessageState } from '@/types';

const useMessageStore = create<MessageState>((set) => ({
    messages: [],
    currentChannelId: null,
    isLoading: false,
    error: null,
    actions: {
        setMessages: (messages) => set({ messages }),
        addMessage: (message) =>
            set((state) => ({ messages: [...state.messages, message] })),
        prependMessages: (messages) =>
            set((state) => ({ messages: [...messages, ...state.messages] })),
        clearMessages: () => set({ messages: [] }),
        setCurrentChannel: (channelId) => set({ currentChannelId: channelId }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
    },
}));

export const useMessages = () => useMessageStore((state) => state.messages);
export const useMessageActions = () => useMessageStore((state) => state.actions);

export default useMessageStore;

