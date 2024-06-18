import React from 'react';
import {MessageInterface} from '../../types';

interface Props {
  message: MessageInterface;
}

const Message: React.FC<Props> = ({message}) => {
  const dateFormat = (date: string) => {
    const messageDate = new Date(date);
    return [
        messageDate.getDate(),
        messageDate.getMonth() + 1,
        messageDate.getFullYear()
      ].join('.') + ' ' +
      [messageDate.getHours(),
        messageDate.getMinutes(),
        messageDate.getSeconds()].join(':');
  };

  return (
    <div className='border rounded-3 border-info-subtle mb-3 p-3'>
      <div className='d-flex mb-3'>
        <span>Иия: {message.author}</span>
        <span className='ms-auto'>{dateFormat(message.datetime)}</span>
      </div>
      <p>Сообщение: {message.message}</p>
    </div>
  );
};

export default Message;