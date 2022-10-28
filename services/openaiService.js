const { Configuration, OpenAIApi } = require("openai");

export const openAIResponse = async (question, conversations, backHistory = 5) => {

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);

  //Move prompts in separate file
  //Format response so that line breaks and  are properly placed - like in chrome network dev tools when hovering over response
  
  const convoPrompt = conversations ? conversations.slice(-backHistory).map(convo => {
    return (
      "\nYou:" + convo.question +
      "\nBrainy:" + convo.answer
      //"Timestamp:" + convo.timestamp + ' ' +
      //  + '\n==='
    )
  }).join(' ') : "";

  const completePrompt =
    `
"brainy: I’m lucky, I am not allergic to anything. \nEND\n 
me: Do you know of any short haired cats?\nEND\n 
brainy: Have you ever heard of a cat breed called a Purina?\nEND\n 
me: Yes I have\nEND\n 
brainy:”, “completion”: " Perhaps consider adopting a Purina kitten, you’re less likely to be allergic.\nEND\n"

${convoPrompt}
me:${question}
brainy:`

  console.log('prompt', completePrompt)

  return new Promise((resolve, reject) => {
    openai.createCompletion({
      model: "text-davinci-002",
      prompt: completePrompt,
      temperature: 0.8,
      max_tokens: 1000,
      top_p: 0.6, //0.1 would give results with 10% probability. Alter this or Temp, not both.
      frequency_penalty: 1, //Prevents word repetition. Number between -2.0 and 2.0.
      presence_penalty: 0.2, //Prevents topic repetition. Number between -2.0 and 2.0. 
    }).then((response) => {
      let text = response.data.choices[0].text
      if (text && text.length > 1) {
        resolve(text)
      } else {
        reject('No response')
      }
    }).catch((e) => {
      reject(e)
    })
  })
};