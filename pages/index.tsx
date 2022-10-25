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
      <div style={{ paddingTop: "57px", paddingLeft: "2rem", paddingRight: "2rem",
    textAlign: "justify" }}>

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
        <p>
          Brainy is a simple yet powerful conversational AI (artificial intelligence) chatbot powered by open AI’s most powerful davinci-02 model.
          <br />          The purpose of Brainy is to have a continuous context based conversation. With each reply, Brainy receives the previous conversations which helps develop a useful conversation.
          <br /><br />
          How to use
          <br />
          Creating a new conversation
          Examples of how to have a useful conversation.
          What to do if Brainy stops responding useful replies. Delete conversation .
          <br />          Ideas on how to train the AI to get better responses
          <br />          Brainy was created with the idea of conversational research in mind, a virtual brain who has access to much of the information available on the internet. This information can then be searched using the chat interface. Each reply is then submitted along with the previous chat history, which gives the AI context and meaning.
          <br />
          FAQ

          If a conversation gets out of hand what should I do?
          you can either delete the chat which is causing trouble, or start a new conversation.

          Improve on QA, make it as easy as possible to answer questions
        </p>

      </div >
    </Layout >
  )
}

export default Home
