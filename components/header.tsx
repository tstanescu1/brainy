import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useLocalStorage from '../lib/useLocalStorage'

type HeaderProps = {
  user?: any
  loading: boolean
}
// console.log('id',localStorage.getItem('id'))
const Header = ({ user, loading }: HeaderProps) => {
  const { query } = useRouter();
  const queryID = query.id


  return (
    <header>

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          {user && <li>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </li>}
          {!loading &&
            (user ? (
              <>
                <li>
                  <Link href={{ pathname: '/research', query: { id: queryID || null, new: true } }}>
                    <button onClick={() => {}} type="submit" className="navBtn">New</button>
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: '/research', query: { id: queryID || getCookie('id') } }}>
                    <button type="submit" className="navBtn">Resume</button>
                  </Link>
                </li>
              </>
            ) : ( //`/research/?id=${encodeURIComponent(id)}`
              <li>
                <a href="/api/login">Login</a>
              </li>
            ))}
        </ul>
      </nav>

      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
          height: 7vh;
        }
        nav {
          margin: 1rem auto;
          padding-left: 1rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:nth-child(3) {
          margin-right: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        button {
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          border: none;
          background: none;
        }
        .navBtn {
          margin-top: 2px;
          background: rgb(0, 196, 65);
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.23s;
          border-radius: 3px;
        }
        .navBtn:disabled {
          background: #fff;
          color: #ccc;
          cursor: no-drop;
        }
        .navBtn:hover {
          background: rgb(0, 180, 50);
        }
        
      `}</style>
    </header>
  )
}

export default Header
