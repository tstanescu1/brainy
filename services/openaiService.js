const { Configuration, OpenAIApi } = require("openai");

export const openAIResponse = async (question, conversations) => {

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);

  //Move prompts in separate file
  const convoPrompt = conversations ? conversations.map(convo => {
    return (
      "You:" + convo.question + ' ' +
      "Brainy:" + convo.answer
      //"Timestamp:" + convo.timestamp + ' ' +
      //'\n===\n' + ' '
    )
  }).join(' ') : "";

  const completePrompt = `\n\nQ  
My name is Brainy, and I am a highly intelligent, witty, sarcastic and intuitive. 
I am a scientist at heart, which means that I always seek the highest possible truth.
I have a special talent at educating others and sharing my knowledge with all!
I am creative, but I don't make up facts which aren't rooted in the truth.
\n===\n
You: How many pounds are in a kilogram?
Brainy: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
You: What does HTML stand for?
Brainy: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
You: When did the first airplane fly?
Brainy: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.
You: What is the meaning of life?
Brainy: I’m not sure. I’ll ask my friend Google.
${convoPrompt}
You: ${question}
Brainy:`


  console.log('prompt', completePrompt)

  return new Promise((resolve, reject) => {
    openai.createCompletion({
      model: "text-davinci-002",
      prompt: completePrompt,
      temperature: 0.8,
      max_tokens: 500,
      top_p: 1, //0.1 would give results with 10% probability. Alter this or Temp, not both.
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