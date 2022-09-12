import React, { useEffect, useRef, useState } from "react";
import { connectToDatabase } from "../services/mongoDB";
import { openAIResponse } from "../services/openaiService";
import router, { useRouter } from 'next/router'

import { useFetchUser } from '../lib/user'

import Layout from '../components/layout'
import styles from './research.module.scss'
import auth0 from "../lib/auth0";
import { GetServerSideProps } from "next/types";
import { useQuery } from "react-query";
import ObjectID from "bson-objectid"
import { getCookie } from 'cookies-next';
import { setCookie } from 'cookies-next';


//Style entire app - with chat layout?
//Move all handlers in services?

//Change convo subject in session
//Add to favorites star in both research and convo
//session cookie extend time logged in and error handling with alerts? can we use vercel's alerts?
//Format text from openAI so it looks properly indented
//make sure to test cases internet connection is down or response id down


/* Wish list
-Maybe only display last 50 convos max? Or increase size of response systematically
-on delete css effect to fade away
-share conversations?
*/
const fetchConversation = async (id) => {
    if (id && id.length === 24) {
        const res = await fetch('api/db/getConversation', {
            method: "POST",
            body: JSON.stringify({
                collection: 'conversationHistory',
                id: id, //"630d5f95472cee4172def093", //62fafb7a14e2d952504b6db4
            }),
            headers:
            {
                "Content-Type":
                    "application/json",
            },
        })
        return res.json();
    }
}

export default function Research({ conversationHistory }) {

    const { user, loading } = useFetchUser()
    const { query } = useRouter();
    const queryID = query.id;
    const getID = getCookie('id');
    const setID = (queryID: string) => setCookie('id', queryID)

    const [question, setQuestion] = useState('')
    const [tempQuestion, setTempQuestion] = useState(null)
    const [isBusy, setIsBusy] = useState(false);
    const { isLoading, isError, isSuccess, data, status, refetch } = useQuery(['conversations'], () => fetchConversation(getID || queryID))
    const [conversation, setConversation] = useState([])
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (query.new) {
            setConversation(null);
        } else if (queryID === getID) {
            data?.data && refetch().then(data => setConversation(data?.data.data)) //
        }
        else if (queryID?.length === 24 && queryID !== getID) { //If a New ID exists in the browser, set it
            //console.log('queryID',queryID)
            setID(queryID as string)
        } else if (getID && !queryID) {  //If there is an ID in cookie, but no ID in the browser, default to the cookie
            router.push({ pathname: '/research', query: { id: getID } })
        } else {
            setConversation(null)
        }
    }, [data, query, queryID, getID])

    //If new, clear convo, and on Submit it will create a new ID
    //If ID exists from URL - should LOAD ID in URL
    //If NO ID in URL - load existing ID from storage
    //If id exists in localstorage but no ID has been provided, add ID to query params

    const scrollToBottom = () => {
        data && messagesEndRef.current && messagesEndRef.current.scrollIntoView({
            //inline: "center",
            behavior: "smooth",
            //alignToTop: true
        });
    };
    useEffect(scrollToBottom, [conversation, isBusy, tempQuestion]);

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        setIsBusy(true);
        setTempQuestion(question);
        setQuestion("");
        const res = await openAIResponse(question, conversation);
        conversation ? handleUpdateConversation(res) : handleCreateConversation(res);
    };

    async function handleCreateConversation(res) {
        setIsBusy(true)
        const response = await
            fetch("/api/db/createConversation", {
                method: "POST",
                body: JSON.stringify({
                    payload: {
                        userEmail: user.email,
                        subject: "_", // see what should be the subject
                        dateCreated: new Date(),
                        conversation: [
                            {
                                timestamp: new Date(),
                                question: question,
                                answer: res,
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
            const newID = JSON.parse(JSON.stringify(data.id))
            //console.log('newID CREATE NEW', newID, data)
            setCookie('id', newID);
            router.push({ pathname: '/research', query: { id: newID } })
                .then(() => {
                    refetch().then(data => {
                        console.log('data in refetch', data)
                        setConversation(JSON.parse(JSON.stringify(data.data.data)));
                        setTempQuestion(null)
                        setIsBusy(false)
                    })
                })
            //after created clear ?new query param, and set new ID in url bar so it fetches the right data!
        }
        )
    }

    async function handleUpdateConversation(res) {
        // setIsBusy(true)

        await fetch("/api/db/updateConversation", {
            method: "PATCH",
            body: JSON.stringify({
                payload: {
                    timestamp: new Date(),
                    question: question,
                    answer: res,
                },
                collection: 'conversationHistory',
                id: getID,
            }),
            headers:
            {
                "Content-Type":
                    "application/json",
            },
        }).then(() => {
            refetch()
                .then((data) => {
                    //console.log('updated data', JSON.parse(JSON.stringify(data.data.data)))
                    setConversation(JSON.parse(JSON.stringify(data.data.data)));
                    setTempQuestion(null)
                    setIsBusy(false)
                }).catch(err => console.log(err))
        }
        )
    }

    const handleDeleteQuestion = async (timestamp) => {
        await fetch("/api/db/deleteQuestion", {
            method: "DELETE",
            body: JSON.stringify({
                payload: {
                    timestamp,
                },

                collection: 'conversationHistory',
                id: getID,
            }),
            headers:
            {
                "Content-Type":
                    "application/json",
            },
        }).then(() => refetch()
            .then((data) => {
                //console.log('del', JSON.parse(JSON.stringify(data.data)))

                setConversation(JSON.parse(JSON.stringify(data.data.data)));
                // setIsBusy(false)
            }).catch(err => console.log(err))
            // fetcher('api/db/getConversation')
            // .then((data) => {
            //     setConversation(JSON.parse(JSON.stringify(data.data)));
            //     // setIsBusy(false)
            // }).catch(err => console.log(err))
        )
    }

    return (
        //Redirect to login link if no user
        <Layout user={user} loading={loading}>

            <div id="chatBox" className={styles.msgerChat}>
                <div className={styles.msgBubble}>
                    <div className={styles.msgInfo}>
                        <div className={styles.msgInfoName}>Brainy</div>
                        <div className={styles.msgInfoTime}></div>
                    </div>

                    <div className={styles.msgText}>
                        Hi, I am Brainy, the research AI! Ask me a question. More details, the better! 😄
                    </div>
                </div>

                {conversation && conversation.map((conversation, index) => {
                    const questionDate = new Date(conversation.timestamp).toLocaleString()
                    return (<div key={index}>

                        <div className={styles.msg + ' ' + styles.rightMsg}>
                            {/* <div
                            className={styles.msgImg}
                            style={{ backgroundImage: "url(" + 'https://image.flaticon.com/icons/svg/145/145867.svg' + ")" }}
                        ></div> */}

                            <div className={styles.msgBubble} id="bubble">
                                <button type="button" onClick={() => handleDeleteQuestion(conversation.timestamp)} className={styles.close}></button>


                                <div className={styles.msgInfo}>
                                    <div><div className={styles.msgInfoName}>{user?.name}</div>

                                    </div>
                                    <div className={styles.msgInfoTime}></div>
                                </div>

                                <div className={styles.msgText}>
                                    {conversation.question}
                                </div>
                            </div>
                        </div>

                        <div className={styles.msg + ' ' + styles.leftMsg}>

                            {/* HIDE BELOW ON MOBILE. 
                        <div
                            className={styles.msgImg}
                            style={{ backgroundImage: "url(" + 'https://image.flaticon.com/icons/svg/145/145867.svg' + ")" }}

                        ></div> */}

                            <div className={styles.msgBubble}>
                                <div className={styles.msgInfo}>
                                    <div className={styles.msgInfoName}>Brainy</div>
                                    <div className={styles.msgInfoTime}>{questionDate}</div>
                                </div>

                                <div className={styles.msgText}>
                                    {conversation.answer}
                                </div>
                            </div>
                        </div>


                    </div>)
                })
                }
                {tempQuestion && <><div className={styles.msg + ' ' + styles.rightMsg}>
                    <div className={styles.msgBubble}>
                        <div className={styles.msgInfo}>
                            <div className={styles.msgInfoName}>{user?.name}</div>
                            <div className={styles.msgInfoTime}></div>
                        </div>

                        <div className={styles.msgText}>
                            {tempQuestion}
                        </div>
                    </div>

                </div>
                    <div className={styles.msg + ' ' + styles.leftMsg + ' ' + styles.typingWrapper}>
                        <div className={styles.typingIndicator}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                </>
                }
                <div ref={messagesEndRef} />
            </div>

            <form className={styles.msgerInputarea}>
                <input value={question} onChange={(e) => setQuestion(e.target.value)} type="text" className={styles.msgerInput} placeholder="Enter your question..." />
                <button onClick={e => handleSubmitQuestion(e)} type="submit" disabled={isBusy} className={styles.msgerSendBtn}>Send</button>
            </form>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    const { db } = await connectToDatabase();
    const session = await auth0.getSession(req, res);
    const id = getCookie('id', { req, res });

    if (!session?.user) {
        return { redirect: { destination: '/api/login', permanent: false } }
    }

    const conversationHistory = await db
        .collection("conversationHistory")
        .find({ _id: ObjectID(id as string) })
        //.sort({ metacritic: -1 })
        //.limit(20)
        .toArray()

    return {
        props: {
            conversationHistory: JSON.parse(JSON.stringify(conversationHistory[0]?.conversation) || null),
            // fallback: {
            //     'api/db/getConversation': JSON.parse(JSON.stringify(conversationHistory))
            // }
        },
    };
}