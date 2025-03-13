import React, { useEffect, useState } from 'react';
import { MessageActions } from '../enums/message-actions';
import { Subscription } from 'rxjs';
import InputArea from '../components/input-area'; // Handles AI responses in a text field
import MessageInputBar from '../components/message-input-bar'; // Input bar for user messages
import client from '../bridges/connection-factory'; // Import RSocket client

interface MessageSet {
  userMessage: {
    text: string;
    time: string;
    userName: string;
    userColorIndex: number;
    options: React.ReactNode;
  };
  aiMessage?: {
    text: string;
    time: string;
    userName: string;
    userColorIndex: number;
    options: React.ReactNode;
  } | null;
}

function MessageList(props: {
  items: {
    text: string;
    time: string;
    userName: string;
    userColorIndex: number;
    options: React.ReactNode;
  }[]
}) {
  useEffect(() => {
    console.log('MessageList rendered with items:', props.items);
  }, [props.items]);

  return null;
}

const ChatClientView: React.FC = () => {
  const [messageSets, setMessageSets] = useState<MessageSet[]>([]);
  const [loading, setLoading] = useState(false);
  let subscription: Subscription;

  const handleSendMessage = (userMessage: string) => {
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
    subscription = client
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

  const handleReceiveResponse = (aiResponse: any, userMessageData: any) => {
    const aiMessage = {
      text: aiResponse,
      time: new Date().toLocaleTimeString(),
      userName: 'AI',
      userColorIndex: 2,
      options: renderMessageOptions(messageSets.length),
    };

    const messageSet: MessageSet = { userMessage: userMessageData, aiMessage };

    setMessageSets((prevMessageSets) => [...prevMessageSets, messageSet]);
  };

  const renderMessageOptions = (index: number) => (
    <div className="message-options">
      <span role="img" aria-label="thumbs up" onClick={() => handleIconClick(index, MessageActions.THUMBS_UP)}>👍</span>
      <span role="img" aria-label="thumbs down" onClick={() => handleIconClick(index, MessageActions.THUMBS_DOWN)}>👎</span>
      <span role="img" aria-label="trash" onClick={() => handleIconClick(index, MessageActions.TRASH)}>🗑️</span>
      <span role="img" aria-label="retry" onClick={() => handleIconClick(index, MessageActions.RETRY)}>🔄</span>
    </div>
  );

  const handleIconClick = (index: number, action: MessageActions) => {
    console.log(`Icon clicked at index ${index} with action ${action}`);
  };

  return (
    <div>
      <MessageList items={messageSets.map(set => [set.userMessage, set.aiMessage]).flat().filter((item): item is NonNullable<typeof item> => item != null)} />
      <InputArea
        label="AI Response"
        value={messageSets.length > 0 ? messageSets[messageSets.length - 1].aiMessage?.text : ''}
        readonly
        style={{ width: '100%' }}
      />
      {loading && <div>Loading...</div>}
      <footer>
        <MessageInputBar onSend={handleSendMessage} placeholder="Type your message..." />
      </footer>
    </div>
  );
};

/**
 * <h1>{@link ChatClientView}</h1>
 */
export default ChatClientView;
