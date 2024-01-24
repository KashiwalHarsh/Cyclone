import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import ChatProvider from './context/ChatProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChatProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ChatProvider>
);
