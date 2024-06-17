import React from 'react';

interface Props {
  message: string;
  name: string;
  onChangeName : React.ChangeEventHandler<HTMLInputElement>;
  onChangeMessage: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const MessageForm: React.FC<Props> = ({message, name, onChangeName, onChangeMessage}) => {
  return (
    <div className='input-field'>
      <form className='d-flex align-items-center justify-content-between ms-5 me-5 mb-3 mt-1'>
        <div className='mb-3 me-3'>
          <label htmlFor='name' className='form-label'>Ваше имя:</label>
          <input type="text" className='form-control' id='name' required value={name} onChange={onChangeName} />
        </div>
        <textarea id="message" cols={60} rows={3} className='border border-primary-subtle me-5' required
                  placeholder='Введите ваше сообщение' value={message} onChange={onChangeMessage}></textarea>
        <button type='submit' className='btn btn-success'>Send message</button>
      </form>
    </div>
  );
};

export default MessageForm;