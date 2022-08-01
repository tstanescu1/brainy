const { Configuration, OpenAIApi } = require("openai");
  
export const openAIResponse = async (question) => {
    //const content = document.querySelector("textarea").value;

    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);

    return new Promise((resolve, reject) => {
      openai.createCompletion({
        model: "text-davinci-002",
        prompt: `\n\nQ:${question}\nA`,
        temperature: 0,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
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