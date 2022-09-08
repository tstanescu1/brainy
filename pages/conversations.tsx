import ObjectID from "bson-objectid";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import InputTextBlur from "../components/InputTextBlur";

import Layout from '../components/layout'

import { useFetchUser } from '../lib/user'

import styles from './conversations.module.scss'

const handleFetchConversations = async (user) => {
    if (user) {
        const res = await fetch('api/db/getAllConversations', {
            method: "POST",
            body: JSON.stringify({
                collection: 'conversationHistory',
                userEmail: user.email,
            }),
            headers:
            {
                "Content-Type":
                    "application/json",
            },
        })
        const response = await res.json();
        //console.log('res', response)
        return response;
    }
}

export default function Conversations() {
    const { user, loading } = useFetchUser();
    const { isLoading, isError, isSuccess, data, status, refetch } = useQuery([user], () => handleFetchConversations(user), {
        refetchOnWindowFocus: true, //Watch NetNinja on useQuery series
        staleTime: 60000,
    })
    
    const conversations = data && JSON.parse(JSON.stringify(data.data))

    const renderHeader = () => {
        let headerElement = ['id', 'subject', 'created', 'Q/A', 'Delete']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const handleDeleteConversation = async (id) => {
        if (id && id.length === 24) {
            const res = await fetch('api/db/deleteConversation', {
                method: "DELETE",
                body: JSON.stringify({
                    collection: 'conversationHistory',
                    id: id,
                }),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            })
            return await res.json().then(() => refetch())
        }
    }

    const handleUpdateConversationSubject = async (value, id) => {

        const res = await fetch("/api/db/updateConversationSubject", {
            method: "PATCH",
            body: JSON.stringify({
                payload: {
                    subject: value
                },
                collection: 'conversationHistory',
                id: ObjectID(id),
            }),
            headers:
            {
                "Content-Type":
                    "application/json",
            },
        })

        return await res.json().then(() => refetch())
    }

    const renderBody = () => {
        return data && conversations.map(({ _id, dateCreated, subject, conversation }) => {
            const formattedDate = new Date(dateCreated).toLocaleDateString()


            return (
                <tr key={_id}>
                    <td style={{cursor:"pointer", fontWeight: "bold", color: "#7293ba"}} onClick={() => router.push({ pathname: '/research', query: { id: _id } })}>{_id}</td>
                    <td><InputTextBlur id={_id} subject={subject} onBlur={(value, id) => handleUpdateConversationSubject(value, id)} /></td>
                    <td>{formattedDate}</td>
                    <td>{conversation.length}</td>
                    <td className={styles.operation}>
                        <button className={styles.button} onClick={() => handleDeleteConversation(_id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        //Redirect to login link if no user

        <Layout user={user} loading={loading}>
            {/* {user && !conversations && <div>Loading...</div>} */}
            {user ?
                <>
                    <h1 className={styles.title}>Conversation History</h1>
                    <table className={styles.conversations}>
                        <thead>
                            <tr>{renderHeader()}</tr>
                        </thead>
                        <tbody>
                            {renderBody()}
                        </tbody>
                    </table>
                </> : <div>You must log in to see your conversations.</div>

            }
        </Layout>
    )
}