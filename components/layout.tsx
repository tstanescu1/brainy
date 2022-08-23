import Head from 'next/head'
import React from 'react'
import Header from './header'

type LayoutProps = {
  user?: any
  loading?: boolean
  children: React.ReactNode
}

const Layout = ({ user, loading = false, children }: LayoutProps) => {


  return (
    <>
      <Head>
        <title>Brainy the Research AI</title>
      </Head>

      <Header user={user} loading={loading} />

      <main>
        {children}
      </main>

      <style jsx>{`
        main {
          // position: relative;
          // height: 100vh;
          // box-sizing: border-box;
        }
      `}</style>
      <style jsx global>{`
        body {
          background: #eee; //gray out whitespace
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </>
  )
}

export default Layout
