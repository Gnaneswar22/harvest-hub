import React from 'react';

const ChatWindow = () => {
    return (
        <div className="border p-4 h-64 overflow-y-scroll bg-white rounded shadow">
            <div className="text-center text-gray-500">Chat with seller/buyer</div>
            {/* Chat messages would go here */}
        </div>
    );
};

export default ChatWindow;
