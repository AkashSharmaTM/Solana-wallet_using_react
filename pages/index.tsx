import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'
import Head from 'next/head'
import { SendToken } from '../components/SendToken' 

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet</title>
        <meta name="description" content="Wallet-Adapter" />
        <link rel="icon" href="/sol.ico" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <SendToken /> 
        </div>
      </WalletContextProvider>
    </div>
  );
}

export default Home;
