import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { graphqlClient } from '../lib/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={graphqlClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
