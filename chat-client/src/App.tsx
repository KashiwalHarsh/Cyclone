import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Chats from './pages/Chats';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
