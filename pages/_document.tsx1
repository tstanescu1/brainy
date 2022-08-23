import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import styles from './styles.module.scss';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>  
          {/* style={{ height: '100%' }} */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;