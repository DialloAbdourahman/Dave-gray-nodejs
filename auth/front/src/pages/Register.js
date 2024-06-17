import React, { useState } from 'react';
import axios from '../api/axios';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    try {
      setLoading(true);
      const {
        data: { success },
      } = await axios.post('/register', {
        username,
        password,
      });
      setUsername('');
      setPassword('');
      alert(success);
    } catch (error) {
      alert('There was an error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='username'
        />{' '}
        <br />
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />{' '}
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Register;
