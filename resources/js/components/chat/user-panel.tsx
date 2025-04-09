import { usePage } from "@inertiajs/react";

export default function UserPanel() {
    const { auth } = usePage().props
    const currentUser = auth.user as User

    return (
        <div className="p-2 bg-gray-800 border-t border-gray-900">
            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-700">
                <div className="flex items-center">
                    <div className="relative">
                        {/* Mic, headphone, settings icons would go here */}
                        <div
                            className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">US
                        </div>
                        <div
                            className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800"></div>
                    </div>
                    <div className="ml-2">
                        <div className="text-sm font-medium">{currentUser.name}</div>
                        <div className="text-xs text-gray-400">Online</div>
                    </div>
                </div>
                <div className="flex space-x-1 text-gray-400">
                    {/* Mic, headphone, settings icons would go here */}
                    <svg className="w-5 h-5 hover:text-gray-200" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}
