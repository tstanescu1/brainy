import React, { useState } from "react";
import { connectToDatabase } from "../services/mongoDB";
import { openAIResponse } from "../services/openaiService";
import Image from 'next/image'
import axios from "axios";
import useSWR, { mutate, SWRConfig } from 'swr';
import router from 'next/router'

import { useFetchUser } from '../lib/user'

import Layout from '../components/layout'
import styles from './research.module.scss'
import auth0 from "../lib/auth0";
import { GetServerSideProps } from "next/types";




export function Research() {
    const [promptText, setPromptText] = useState("");
    const { user, loading } = useFetchUser()

    const [answer, setAnswer] = useState("")
    const [id, setID] = useState();

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data, error, isValidating } = useSWR('api/db/getConversationHistory')
    const [conversation, setConversation] = useState(data[0]?.conversation)


    const handleSubmitQuestion = async () => {
        //const pl = { ...payload, prompt: promptText };
        //setPayload(pl);
        await openAIResponse(promptText).then(res => setAnswer(res))
        //setAnswer(answer);
        //setPromptText(promptText);
        console.log(answer)
    };

    async function handleCreate() {
        const response = await
            fetch("/api/db/insertOneMongo", {
                method: "POST",
                body: JSON.stringify({
                    payload: {
                        userEmail: user.email,
                        subject: "My first subject",
                        dateCreated: new Date(),
                        conversation: [
                            {
                                timestamp: new Date(),
                                question: promptText,
                                answer: answer,
                            }
                        ]
                    },
                    collection: 'conversationHistory',
                }),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            })

        await response.json().then((data) => {
            localStorage.setItem("id", data.id)
            fetcher('api/db/getConversationHistory')
                .then((data) => {
                    setConversation(JSON.parse(JSON.stringify(data.data)));
                })
        }
        )
    }

    async function handleUpdate() {
        await fetch("/api/db/updateOneMongo", {
            method: "PATCH",
            body: JSON.stringify({
                payload: {
                    timestamp: new Date(),
                    question: promptText,
                    answer: answer,
                },
                collection: 'conversationHistory',
                id: localStorage.getItem('id'),
            }),
            headers:
            {
                "Content-Type":
                    "application/json",
            },
        }).then(() =>
            fetcher('api/db/getConversationHistory')
                .then((data) => {
                    setConversation(JSON.parse(JSON.stringify(data.data)));
                })
        )
    }

    return (
        //Redirect to login link if no user
        <Layout user={user} loading={loading}>
            <h1>Research Topics</h1>

            <div>
                {conversation?.map((conversation, index) => {
                    const questionDate = new Date(conversation.timestamp).toLocaleString()
                    return (<div key={index}>
                        <div className={styles.container + " " + styles.darker}>
                            <div className={styles.timeRight}>
                                <Image width={60} height={60} src={user.picture} alt="Avatar" />
                            </div>
                            <p>{conversation.question}</p>
                            <span className={styles.timeLeft}>{questionDate}</span>
                        </div>

                        <div className={styles.container}>
                            <img src="/brainy.jpg" alt="Avatar" />
                            <p>{conversation.answer}</p>
                        </div>
                    </div>)
                })
                }
            </div>

            <textarea style={{ width: '77vw', height: '140px' }}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
            />
            <button
                onClick={() => {
                    handleSubmitQuestion()
                
                }}
            >
                Ask
            </button>
            {conversation ?
                <button
                    onClick={() => handleUpdate()}>Update Conversation
                </button> :
                <button
                    onClick={() => handleCreate()}>Create Converation
                </button>}




            {/* <div className={styles.container}>
                <h1>Research Topics</h1>


                <textarea

                    value={`${promptText + answer}`}
                    onChange={(e) => changePromptHandler(e)}
                />
                <button
                    onClick={() => handleSubmit()}
                >
                    Submit
                </button>
                <button
                    onClick={() => handleSave()}
                >
                    Save
                </button>
                <h3>Favorites</h3>
                {favorites.map(fav => {
                    return (
                        <div>
                            <ul key={fav._id}><b>Question:</b> {fav.question}</ul>
                            <ul><b>Answer:</b> {fav.answer}</ul>
                        </div>
                    )
                })}
            </div> */}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const { db } = await connectToDatabase();
    const session = await auth0.getSession(req, res)

    if (!session?.user) {
      return { redirect: { destination: '/api/login', permanent: false } }
    }

    const conversationHistory = await db
        .collection("conversationHistory")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

    return {
        props: {
            // conversationHistory: JSON.parse(JSON.stringify(conversationHistory)),
            fallback: {
                'api/db/getConversationHistory': JSON.parse(JSON.stringify(conversationHistory))
            }
        },
    };
}

export default function Page({ fallback }) {
    // SWR hooks inside the `SWRConfig` boundary will use those values.
    return (
        <SWRConfig value={{ fallback }}>
            <Research />
        </SWRConfig>
    )
}