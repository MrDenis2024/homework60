import React from 'react';
import Message from './Message';
import {MessageInterface} from '../../types';

interface Props {
  messages: MessageInterface[];
}

const MessageList: React.FC<Props> = ({messages}) => {
  return (
    <div className='field border border-secondary p-3 mt-5 field rounded-3'>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;