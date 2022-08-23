import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'
import styles from './styles.module.scss'
const Home = () => {
  const { user, loading } = useFetchUser()

  // useEffect(() => {
  //   document.querySelector("#__next").className = "color: 'red'";
  // }, []);

  return (
    <Layout user={user} loading={loading}>
      <h1>INDEX PAGE</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in{' '}
            <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      {user && (
        <>
          <h4>Rendered user info on the clientsss</h4>
          <img src={user.picture} alt="user picture" />
          <p>nickname: {user.nickname}</p>
          <p>name: {user.name}</p>
        </>
      )}
    </Layout>
  )
}

export default Home
