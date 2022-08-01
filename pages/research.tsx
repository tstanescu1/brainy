import React, { useState } from "react";
import { openAIResponse } from "../services/openaiService";
import { useFetchUser } from '../lib/user'
import Layout from '../components/layout'


const research = () => {
    const [promptText, setPromptText] = useState("");
    const { user, loading } = useFetchUser()

    const changePromptHandler = (e) => {
        setPromptText(e.target.value);
    };

    const submitHandler = async () => {
        //const pl = { ...payload, prompt: promptText };
        //setPayload(pl);
        const answer = await openAIResponse(promptText)
        setPromptText(`${promptText + answer}`);
    };

    return (
        <Layout user={user} loading={loading}>

        <div>
            <h1>Research Topics</h1>


            <textarea

                value={promptText}
                onChange={(e) => changePromptHandler(e)}
            />
            <button
                onClick={() => submitHandler()}
            >
                Submit
            </button>

        </div>
        </Layout>
    );
};

export default research