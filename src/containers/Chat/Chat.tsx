import React, {ChangeEvent, useState} from 'react';
import MessageForm from '../../components/MessageForm/MessageForm';

const Chat = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

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
    <div>
      <MessageForm name={name} onChangeName={changeName} onChangeMessage={changeMessage} message={message} onNewMessage={(event) => sendMessage(event)}/>
    </div>
  );
};

export default Chat;