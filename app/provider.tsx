'use client';

import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import axios from 'axios';

function Provider({ children } : { children : ReactNode }) {
  const { data } = useSession();

  useEffect(()=>{
    data?.user?.email && user();
  },[data])

  const user = async() => {
    try {
      await axios.post('/api/user', {});
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>{children}</div>
  )
}

export default Provider