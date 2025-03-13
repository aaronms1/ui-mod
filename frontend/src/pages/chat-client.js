import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { MessageActions } from '../enums/message-actions';
import InputArea from '../components/input-area'; // Handles AI responses in a text field
import MessageInputBar from '../components/message-input-bar'; // Input bar for user messages
import client from '../bridges/connection-factory'; // Import RSocket client
import './ChatClientView.scss'; // Include necessary styling
function MessageList(props) {
    return null;
}
const ChatClientView = () => {
    const [messageSets, setMessageSets] = useState([]);
    const [loading, setLoading] = useState(false);
    let subscription;
    const handleSendMessage = (userMessage) => {
        const userMessageData = {
            text: userMessage,
            time: new Date().toLocaleTimeString(),
            userName: 'User',
            userColorIndex: 1,
            options: renderMessageOptions(messageSets.length),
        };
        setMessageSets((prevMessageSets) => [
            ...prevMessageSets,
            { userMessage: userMessageData, aiMessage: null },
        ]);
        setLoading(true);
        client
            .rsocketCall('user.request', { text: userMessage })
            .subscribe({
            next: (aiResponse) => {
                handleReceiveResponse(aiResponse, userMessageData);
                setLoading(false);
            },
            error: (error) => {
                console.error('RSocket error:', error);
                setLoading(false);
            },
        });
    };
    const handleReceiveResponse = (aiResponse, userMessageData) => {
        const aiMessage = {
            text: aiResponse,
            time: new Date().toLocaleTimeString(),
            userName: 'AI',
            userColorIndex: 2,
            options: renderMessageOptions(messageSets.length),
        };
        const messageSet = { userMessage: userMessageData, aiMessage };
        setMessageSets((prevMessageSets) => [...prevMessageSets, messageSet]);
    };
    const renderMessageOptions = (index) => (_jsxs("div", { className: "message-options", children: [_jsx("span", { role: "img", "aria-label": "thumbs up", onClick: () => handleIconClick(index, MessageActions.THUMBS_UP), children: "\uD83D\uDC4D" }), _jsx("span", { role: "img", "aria-label": "thumbs down", onClick: () => handleIconClick(index, MessageActions.THUMBS_DOWN), children: "\uD83D\uDC4E" }), _jsx("span", { role: "img", "aria-label": "trash", onClick: () => handleIconClick(index, MessageActions.TRASH), children: "\uD83D\uDDD1\uFE0F" }), _jsx("span", { role: "img", "aria-label": "retry", onClick: () => handleIconClick(index, MessageActions.RETRY), children: "\uD83D\uDD04" })] }));
    const handleIconClick = (index, action) => {
        // Handle the action if needed
    };
    return (_jsxs("div", { children: [_jsx(MessageList, { items: messageSets.map(set => [set.userMessage, set.aiMessage]).flat().filter((item) => item != null) }), _jsx(InputArea, { label: "AI Response", value: messageSets.length > 0 ? messageSets[messageSets.length - 1].aiMessage?.text : '', readonly: true, style: { width: '100%' } }), loading && _jsx("div", { children: "Loading..." }), _jsx("footer", { children: _jsx(MessageInputBar, { onSend: handleSendMessage, placeholder: "Type your message..." }) })] }));
};
/**
 * <h1>{@link ChatClientView}</h1>
 */
export default ChatClientView;
//# sourceMappingURL=chat-client.js.map