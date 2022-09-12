// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0'

import React from "react";
import Layout from "../components/layout"
import { User } from "../interfaces"
import { useFetchUser } from "../lib/user"
import { connectToDatabase } from "../services/mongoDB";

//Manage subscription or input API key?

type ProfileCardProps = {
  user: User;
  isConnected: boolean;
}

const ProfileCard = ({ user, isConnected }: ProfileCardProps) => {

  return (
    <div style={{ paddingTop: "57px", paddingLeft: "2rem" }}>

      <h1>Profile</h1>

      <div>
        <p>name: {user.name}</p>
        <p>email: {user.email}</p>
        <p>Connected to DB: {isConnected ? 'Yes' : 'No'}</p>
      </div>

      {user &&
        <a href="/api/logout">Logout</a>
      }
    </div>
  )
}

const Profile = ({ isConnected }) => {
  const { user, loading } = useFetchUser({ required: true })

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : <ProfileCard user={user} isConnected={isConnected} />}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    await connectToDatabase
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    // Fetch the user from the db (by email)
    //        let user = await db.user.findUnique({ where: { email: auth0User?.user.email } });

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default Profile
