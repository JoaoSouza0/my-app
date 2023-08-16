import { useEffect, useState } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMesssager';
import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    toastEventManager.on('addtoast', handleToast);

    return () => {
      toastEventManager.remove('addtoast', handleToast);
    };
  });

  function handleRemoveMessage(id) {
    setMessages((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <Container>
      {messages.map(({ type, text, id }) => (
        <ToastMessage
          key={id}
          text={text}
          type={type}
          onRemove={() => handleRemoveMessage(id)}
        />
      ))}
    </Container>
  );
}
