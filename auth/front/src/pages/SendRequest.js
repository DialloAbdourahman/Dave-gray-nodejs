import React, { useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { useGlobalContext } from '../context';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const SendRequest = () => {
  const [loading, setLoading] = useState(false);
  const refresh = useRefreshToken();
  const { user } = useGlobalContext();
  const axiosPrivate = useAxiosPrivate();

  const getEmployees = async () => {
    try {
      setLoading(true);
      const {
        data: { message },
      } = await axiosPrivate.get('/employees');
      alert(message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={getEmployees}>Get Employees</button>
      <button onClick={refresh}>Refresh Token</button>
    </div>
  );
};

export default SendRequest;
