import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/Auth'

const Home = () => {
  const [auth,setAuth] = useAuth()
  return (
  
   <>
    <h1>hey this is home e</h1>
   <pre>{JSON.stringify(auth,null,4)}</pre>
   </>
  )
}

export default Home