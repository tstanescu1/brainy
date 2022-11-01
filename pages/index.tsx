import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'
import styles from './styles.module.scss'
import React from 'react'
import Link from 'next/link'
import router from 'next/router'
import { GetServerSideProps } from 'next/types'
import auth0 from "../lib/auth0";


const Home = () => {
  const { user, loading } = useFetchUser()

  // useEffect(() => {
  //   document.querySelector("#__next").className = "color: 'red'";
  // }, []);

  return (
    <Layout user={user} loading={loading}>
      <div style={{
        paddingTop: "57px", paddingLeft: "2rem", paddingRight: "2rem",
        maxWidth: "750px", border: "solid", background: "#f8f9fa"
      }}>
        {!loading && !user && (
          <>
            <h1>Brainy Learning Bot</h1>
            <p>
              <h6>An Artificial intelligence chatbot that can research any topic of interest.</h6>
              <br></br>
              <ul>It can be used to further develop knowledge in an unknown area of science.</ul>
              <ul>It can help students further understand complex ideas.</ul>
              <br></br>
              The main goal of brainy is to become an effective instrument to gain knowledge. <br></br>
              However, it's best use will be to educate less privileged parts of the world, even in their native tongue.
              <br></br>
              <br></br>
              <h4>How does it work?</h4>
              Brainy works by taking in a piece of text and then predicting the next word or phrase that should come after it.
              In order to accomplish this, it uses a deep learning algorithm called <b>GPT-3</b>, which has been trained on a large corpus of text.
              This allows it to capture the statistical patterns of how words are used together in a sentence.
              <br></br>
              <br></br>
              Brainy's value comes with the continuous context based conversation. With each reply, Brainy receives the previous conversations which helps develop a fruitful conversation.
              <br></br>
              <br></br>
              It can be used for a variety of tasks that involve natural language generation, such as machine translation, question answering, and text summaries.
              GPT-3 can even be used to generate new texts from scratch, such as stories or articles.
              GPT-3 chatbot can be very helpful in research and to help students understand complex ideas by generating natural language based on inputted text.
              <br></br>
              <br></br>

              Once you have logged in a conversation will be created or resumed with <i>Brainy</i>.
            </p>
            Questions, comments, critics: <a href="mailto:tstanescu@gmail.com">email me</a>
          </>
        )}

        {/* {user && (
          <>
            <h4>Hi {user.name},</h4>
            <p>Brainy is an AI chatbot which can be useful to further knowledge in a specific topic.
              By using a conversational model, we can easily extract the information required by creating a multi turn chat.</p>
            <p>Click the top right menu icon and select "New" to start a new conversation with Brainy.</p>
            <p>You can also browse existing conversations by clicking on the "Conversations" button.</p>
            <p>By default, Brainy looks at the last few questions to improve your answer, by gaining a bit of context, the response increases in quality. You can increase the back history by clicking on the back settings menu.</p>
          </>
        )
        }
        <p>

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
 */}



      </div >
    </Layout >
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  const session = await auth0.getSession(req, res);

  if (session?.user) {
    return { redirect: { destination: '/chat', permanent: false } }
  }
  return {
    props: {},
  };

}

export default Home
