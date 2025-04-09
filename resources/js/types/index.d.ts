import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// 服务器类型
export interface Server {
    id: string;
    name: string;
    icon?: string;
    description?: string;
    is_public: boolean;
    channels: Channel[]
}

// 频道类型
export interface Channel {
    id: string;
    name: string;
    type: 'text' | 'voice' | 'announcement';
    server_id: string;
    position: number;
    is_private?: boolean;
    messages: Message[]
}

export interface Message {
    id: string
    content: string
    created_at: string
    edited_at?: string
    is_pinned: boolean
    user: User
    replies?: Message[]
}

export interface MessageState {
    messages: Message[];
    currentChannelId: string | null;
    isLoading: boolean;
    error: string | null;
    actions: {
        setMessages: (messages: Message[]) => void;
        addMessage: (message: Message) => void;
        prependMessages: (messages: Message[]) => void;
        clearMessages: () => void;
        setCurrentChannel: (channelId: string) => void;
        setLoading: (isLoading: boolean) => void;
        setError: (error: string | null) => void;
    };
};

// 服务器列表类型
export type ServerList = Server[];

// export interface Server {
//     id: string
//     name: string
//     channels: Array<{
//         id: string
//         name: string
//         type: string
//         topic?: string
//         unread_count?: number
//     }>
// }
//
// export interface Channel {
//     id: string
//     name: string
//     messages: Array<{
//         id: string
//         content: string
//         created_at: string
//         edited_at?: string
//         is_pinned: boolean
//         user: {
//             id: string
//             name: string
//             avatar?: string
//             status?: string
//         }
//         reactions?: Array<{
//             id: string
//             emoji: string
//             count: number
//             me: boolean
//         }>
//     }>
// }
//
// export interface ServerList {
//     servers: Array<{
//         id: string
//         name: string
//         icon?: string
//         unread_count?: number
//     }>
// }
