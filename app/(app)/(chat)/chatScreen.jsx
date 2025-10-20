import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  // Load some starter messages
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hey there! How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Driver John',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  // Called when you send a new message
  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1, // your logged-in user ID
        name: 'You',
      }}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: '#e63e4c' },
          }}
        />
      )}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          containerStyle={{
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            backgroundColor: '#fff',
          }}
        />
      )}
    />
  );
}

