import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'
import styles from './styles.module.scss'
import React from 'react'
import Link from 'next/link'
const Home = () => {
  const { user, loading } = useFetchUser()

  // useEffect(() => {
  //   document.querySelector("#__next").className = "color: 'red'";
  // }, []);

  return (
    <Layout user={user} loading={loading}>
      <div style={{ paddingTop: "57px", paddingLeft: "2rem" }}>

        {!loading && !user && (
          <>
            <h1>Brainy The Research AI</h1>
            <p>
              Once you have logged in you should be able to start a conversation with <i>Brainy</i>
            </p>
          </>
        )}

        {user && (
          <>
            <h4>Hi {user.name},</h4>
            <p>Click the top right wrench icon to start a new conversation.</p>
          </>
        )
        }

      </div >
    </Layout >
  )
}

export default Home
