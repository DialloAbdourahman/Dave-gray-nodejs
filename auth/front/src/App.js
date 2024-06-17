import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import SendRequest from './pages/SendRequest';
import { useGlobalContext } from './context';
import PersistLogin from './components/PersistLogin';

function App() {
  const [page, setPage] = useState('login');
  const { user } = useGlobalContext();

  return (
    <PersistLogin>
      {user && <h1>{user.username} is logged in</h1>}
      <nav>
        <button onClick={() => setPage('login')}>login</button>
        <button onClick={() => setPage('register')}>register</button>
        <button onClick={() => setPage('sendRequest')}>sendRequest</button>
      </nav>
      {page === 'login' && <Login />}
      {page === 'register' && <Register />}
      {page === 'sendRequest' && <SendRequest />}
    </PersistLogin>
  );
}

export default App;
