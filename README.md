# Brainy Learning Bot

Open Source Chatbot built with Next JS, OpenAI's GPT-3.

An Artificial intelligence chatbot that can research any topic of interest.

It can be used to further develop knowledge in an unknown area of science.
It can help students further understand complex ideas.

The main goal of brainy is to become an effective instrument to gain knowledge.
However, it's best use will be to educate less privileged parts of the world, even in their native tongue.

How does it work?
Brainy works by taking in a piece of text and then predicting the next word or phrase that should come after it. In order to accomplish this, it uses a deep learning algorithm called GPT-3, which has been trained on a large corpus of text. This allows it to capture the statistical patterns of how words are used together in a sentence.

Brainy's value comes with the continuous context based conversation. With each reply, Brainy receives the previous conversations which helps develop a fruitful conversation.

It can be used for a variety of tasks that involve natural language generation, such as machine translation, question answering, and text summaries. GPT-3 can even be used to generate new texts from scratch, such as stories or articles. GPT-3 chatbot can be very helpful in research and to help students understand complex ideas by generating natural language based on inputted text.

Once you have logged in a conversation will be created or resumed with Brainy.

Questions, comments, critics: email me

## How to use

Do a pull, and then npm install.

## Configuring Auth0

1. Go to the [Auth0 dashboard](https://manage.auth0.com/) and create a new application of type _Regular Web Applications_ and make sure to configure the following
2. Go to the settings page of the application
3. Configure the following settings:

- _Allowed Callback URLs_: Should be set to `http://localhost:3000/api/callback` when testing locally or typically to `https://myapp.com/api/callback` when deploying your application.
- _Allowed Logout URLs_: Should be set to `http://localhost:3000/` when testing locally or typically to `https://myapp.com/` when deploying your application.

4. Save the settings

### Set up environment variables

To connect the app with Auth0, you'll need to add the settings from your Auth0 application as environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then, open `.env.local` and add the missing environment variables:

- `NEXT_PUBLIC_AUTH0_DOMAIN` - Can be found in the Auth0 dashboard under `settings`. (Should be prefixed with `https://`)
- `NEXT_PUBLIC_AUTH0_CLIENT_ID` - Can be found in the Auth0 dashboard under `settings`.
- `AUTH0_CLIENT_SECRET` - Can be found in the Auth0 dashboard under `settings`.
- `NEXT_PUBLIC_BASE_URL` - The base url of the application.
- `NEXT_PUBLIC_REDIRECT_URI` - The relative url path where Auth0 redirects back to.
- `NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI` - Where to redirect after logging out.
- `SESSION_COOKIE_SECRET` - A unique secret used to encrypt the cookies, has to be at least 32 characters. You can use [this generator](https://generate-secret.vercel.app/32) to generate a value.
- `SESSION_COOKIE_LIFETIME` - How long a session lasts in seconds. The default is 2 hours.

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.
