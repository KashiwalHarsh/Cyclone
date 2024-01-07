import axios from 'axios';
import { useEffect, useState } from 'react';

const Chats: React.FC = () => {
  interface apiProps {
    _id: string;
    chatName: string;
  }

  const [chats, setChats] = useState<apiProps[]>([]);

  const fetchChats = async () => {
    try {
      const { data, status } = await axios.get(
        'http://localhost:3000/api/chats'
      );

      console.log('Response Recieved', status);
      setChats(data);
    } catch (err) {
      console.log('Something went wrong', err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <>
      {chats &&
        chats.map((chat) => (
          <div key={chat._id}>
            <h1>{chat.chatName}</h1>
          </div>
        ))}
    </>
  );
};

export default Chats;
