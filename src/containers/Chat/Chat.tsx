import {ChangeEvent, useState} from 'react';
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


  return (
    <div>
      <MessageForm name={name} onChangeName={changeName} onChangeMessage={changeMessage} message={message}/>
    </div>
  );
};

export default Chat;