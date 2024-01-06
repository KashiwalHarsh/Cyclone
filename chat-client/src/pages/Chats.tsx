import axios from 'axios';
import { useEffect, useState } from 'react';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    await axios
      .get('http://localhost:3000/api/chats')
      .then((res) => setChats(res.data));
  };

  useEffect(() => {
    fetchChats();
  }, []);
  console.log(chats);

  return (
    <div>
      {/* {chats.map((chat) => {
        <div>{chat.chatName}</div>;
      })} */}
    </div>
  );
};

export default Chats;
