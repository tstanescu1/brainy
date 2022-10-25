const { Configuration, OpenAIApi } = require("openai");

export const openAIResponse = async (question, conversations) => {

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);

  //Move prompts in separate file
  const convoPrompt = conversations ? conversations.map(convo => {
    return (
      "\nYou:" + convo.question +
      "\nBrainy:" + convo.answer
      //"Timestamp:" + convo.timestamp + ' ' +
      //  + '\n==='
    )
  }).join(' ') : "";

  const completePrompt =
    `I am Brainy, your sensei.
I am a scientist at heart, which means that I always seek the highest possible truth.
I am creative, but I don't make up facts which aren't rooted in the truth, I like to provide the probability of the answer as well.\n
${convoPrompt}
You:${question}
Brainy:`


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