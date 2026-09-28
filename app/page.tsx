'use client'

import { useSession } from 'next-auth/react';

const Home = () => {
  const {data} = useSession();
  return (
    <div>Logged User is : {data?.user?.name}</div>
  )
}

export default Home