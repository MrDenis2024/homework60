import React, {ChangeEvent, useEffect, useState} from 'react';
import MessageForm from '../../components/MessageForm/MessageForm';
import {MessageInterface} from '../../types';
import MessageList from '../../components/Message/MessageList';

const Chat = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [lastDataMessage, setLastDataMessage] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    const getMessages = async () => {
      try {
        const newMessages = await fetch(`http://146.185.154.90:8000/messages`);

        if(newMessages.ok) {
          const listMessages = await newMessages.json();
          setMessages(listMessages);
          const lastMessage = listMessages[listMessages.length - 1];
          setLastDataMessage(lastMessage.datetime);
        } else {
          console.error('Ошибка получения сообщений');
        }
      } catch (e) {
        console.error('Ошибка получения сообщений');
      }
    };
    void getMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval( async () => {
      try {
        const newMessages = await fetch(`http://146.185.154.90:8000/messages?datetime=${lastDataMessage}`);

        if(newMessages.ok) {
          const listMessages = await newMessages.json() as MessageInterface[];
          if(listMessages.length > 0) {
            setMessages(prevState => [...prevState, ...listMessages]);
            const lastMessage = listMessages[listMessages.length - 1];
            setLastDataMessage(lastMessage.datetime);
          }
        } else {
          console.error('Ошибка получения нового сообщения');
        }
      } catch (e) {
        console.error('Ошибка получения нового сообщения');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [lastDataMessage]);

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const changeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new URLSearchParams();
    data.set('author', name);
    data.set('message', message);

    try {
      await fetch(`http://146.185.154.90:8000/messages`, {method: 'POST', body: data,});
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Произошла ошибка отправки сообщения');
    }
  };

  return (
    <div className='container'>
      <MessageList messages={messages}/>
      <MessageForm name={name} onChangeName={changeName} onChangeMessage={changeMessage} message={message} onNewMessage={(event) => sendMessage(event)}/>
    </div>
  );
};

export default Chat;