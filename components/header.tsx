import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useLocalStorage from '../lib/useLocalStorage'

type HeaderProps = {
  user?: any
  loading: boolean
}
const Header = ({ user, loading }: HeaderProps) => {
  const { query } = useRouter();
  const queryID = query.id
  const [openMenu, setOpenMenu] = useState(false)

  // 🤖❤️
  return (

    <header>

      <div className="msgerHeaderTitle">
        <div onClick={() => setOpenMenu(!openMenu)}>Brainy🤖AI</div>

        {openMenu && user &&
          <>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
            <Link href="/api/logout">
              <a>Logout</a>
            </Link>
          </>
        }
      </div>

      <div className="msgerHeaderOptions">
        <nav>
          <ul>
            {!user ?
              <li>
                <Link href="/api/login">
                  <a>Register/Login</a>
                </Link>
              </li> :
              <li>
                <button onClick={() => setOpenMenu(!openMenu)} type="submit">⚙️</button>
              </li>}
            {openMenu && !loading &&
              (user ? (
                <>
                  <li>
                    <Link href={{ pathname: '/research', query: { id: queryID || null, new: true } }}>
                      <button type="submit" className="navBtn" onClick={() => setOpenMenu(false)}>New</button>
                    </Link>
                  </li>
                  <li>
                    <Link href={{ pathname: '/research', query: { id: queryID || getCookie('id') } }}>
                      <button type="submit" className="navBtn" onClick={() => setOpenMenu(false)}>Resume</button>
                    </Link>
                  </li>
                  <li>
                    <Link href={{ pathname: '/conversations' }}>
                      <button type="submit" className="navBtn" onClick={() => setOpenMenu(false)}>Conversations</button>
                    </Link>
                  </li>
                </>
              ) : ( //`/research/?id=${encodeURIComponent(id)}`
                ''
              ))}
          </ul>
        </nav>
        <span><i className="wrench"></i></span>
      </div>




      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          //padding: 10px;
          border-bottom: 2px solid #ddd;
          background: #f8f9fa;
          margin-bottom: 5px;
          position: absolute;
          z-index: 1;
          width: 100%;
          padding-bottom: 6px;
          box-shadow: 0 2px 3px -2px grey;
          
        }
         nav {
           padding-left: 1rem;
         }
        ul {
          list-style: none;
          margin-left: 0;
          padding-left: 0;
          text-align: right;
          //flex-flow: wrap;
          margin-bottom: 0px;
          margin-top: 4px;
        }
        li {
          margin-right: 0.5rem;
        }
        // li:nth-child(1) {
        //   margin-right: auto;
        // }
        a {
          color: #000;
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
        .msgerHeaderTitle {
            display: grid;
            justify-content: space-between;
            padding: 6px 10px 0 10px;
            border-bottom: var(--border);
            color: #7a7a7a;
            cursor: pointer;
        };
        .menuWrapper {
          display: grid;
        }
        }
      .msgerHeaderOptions {
        display: flex;
        justify-content: space-between;
        border-bottom: var(--border);
        background: #eee;
        color: #666;
      };
        
      `}</style>
    </header>
  )
}

export default Header
